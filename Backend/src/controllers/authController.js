//Backend/src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, LogAction } = require('../../models');
const mfaService = require('../services/mfaService');

// 🔹 Validación de contraseña
const validatePassword = (password) => {
  const minLength = 8;
  const complexity = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
  if (!password || password.length < minLength)
    return "La contraseña debe tener al menos 8 caracteres";
  if (!complexity.test(password))
    return "Debe incluir mayúsculas, minúsculas, números y caracteres especiales";
  return null;
};

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');
const LOGIN_ATTEMPTS_LIMIT = 3;
const LOGIN_BLOCK_TIME = 0.25 * 60 * 1000; // 15 minutos

function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '5m' });
}

function signTempToken(userId) {
  return jwt.sign({ id: userId, temp: true }, process.env.JWT_SECRET, { expiresIn: '5m' });
}

module.exports = {
  async register(req, res) {
    try {
      const { name, email, emailConfirm, password, passwordConfirm, role } = req.body;

      if (!email || !emailConfirm || email !== emailConfirm)
        return res.status(400).json({ message: 'Emails no coinciden' });

      if (!password || !passwordConfirm || password !== passwordConfirm)
        return res.status(400).json({ message: 'Contraseñas no coinciden' });

      const passwordError = validatePassword(password);
      if (passwordError) return res.status(400).json({ message: passwordError });

      const existing = await User.findOne({ where: { email } });
      if (existing) return res.status(409).json({ message: 'Email ya registrado' });

      // 🔹 Usar setter virtual 'password'
      const user = await User.create({ name, email, password, role: role || 'estudiante' });
      await LogAction.create({ user_id: user.id, action: 'register', meta: { ip: req.ip } });

      const token = signToken(user);
      return res.status(201).json({
        message: 'Usuario creado',
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      });
    } catch (err) {
      console.error('Error creando usuario:', err);
      return res.status(500).json({ message: 'Error creando/actualizando usuario', error: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

      if (user.block_until && new Date() < new Date(user.block_until)) {
        const diff = Math.ceil((new Date(user.block_until) - new Date()) / 1000);
        return res.status(403).json({ message: 'Usuario bloqueado temporalmente', blockedSeconds: diff });
      }

      if (!user.checkPassword(password)) {
        user.failed_attempts = (user.failed_attempts || 0) + 1;
        let attemptsLeft = LOGIN_ATTEMPTS_LIMIT - user.failed_attempts;

        if (user.failed_attempts >= LOGIN_ATTEMPTS_LIMIT) {
          user.block_until = new Date(Date.now() + LOGIN_BLOCK_TIME);
          user.failed_attempts = 0;
          attemptsLeft = 0;
        }

        await user.save();
        return res.status(401).json({ message: 'Credenciales inválidas', attemptsLeft });
      }

      user.failed_attempts = 0;
      user.block_until = null;
      await user.save();

      await LogAction.create({ user_id: user.id, action: 'login', meta: { ip: req.ip } });

      const userData = { id: user.id, name: user.name, email: user.email, role: user.role };

      if (user.mfa_enabled) {
        const tempToken = signTempToken(user.id);
        return res.json({ mfaRequired: true, tempToken, user: userData });
      }

      const token = signToken(user);
      return res.json({ token, user: userData });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error servidor' });
    }
  },

  async me(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ['id', 'name', 'email', 'role', 'mfa_enabled']
      });
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
      return res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, mfa_enabled: user.mfa_enabled } });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error servidor' });
    }
  },

  // MFA
  async mfaSetup(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
      const secret = mfaService.generateSecret();
      const encrypted = mfaService.encryptSecret(secret);
      user.mfa_secret = encrypted;
      await user.save();
      const dataUrl = await mfaService.generateQRCodeDataURL(user.email, secret);
      return res.json({ message: 'Secreto generado', qr: dataUrl });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error generando MFA' });
    }
  },

  async mfaVerify(req, res) {
    try {
      const { code } = req.body;
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : req.body.tempToken || null;
      if (!token) return res.status(401).json({ message: 'Token temporal requerido' });

      let payload;
      try { payload = jwt.verify(token, process.env.JWT_SECRET); }
      catch { return res.status(401).json({ message: 'Token inválido o expirado' }); }

      const user = await User.findByPk(payload.id);
      if (!user || !user.mfa_secret) return res.status(400).json({ message: 'MFA no configurado' });

      const valid = mfaService.verifyToken(user.mfa_secret, code);
      if (!valid) return res.status(401).json({ message: 'Código inválido' });

      if (payload.temp) {
        const finalToken = signToken(user);
        return res.json({ token: finalToken, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
      }

      user.mfa_enabled = true;
      await user.save();
      return res.json({ message: 'MFA activado' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error verificando MFA' });
    }
  }
};
