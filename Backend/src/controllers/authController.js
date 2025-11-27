const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, LogAction } = require('../../models');
const mfaService = require('../services/mfaService');

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');

function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '8h' });
}

// TEMP token for MFA step: short expiry
function signTempToken(userId) {
  return jwt.sign({ id: userId, temp: true }, process.env.JWT_SECRET, { expiresIn: '5m' });
}

module.exports = {
  async register(req, res) {
    try {
      const { name, email, emailConfirm, password, passwordConfirm, role } = req.body;

      if (!email || !emailConfirm || email !== emailConfirm) {
        return res.status(400).json({ message: 'Emails no coinciden' });
      }
      if (!password || !passwordConfirm || password !== passwordConfirm) {
        return res.status(400).json({ message: 'Contraseñas no coinciden' });
      }

      // Validaciones adicionales (longitud)
      if (password.length < 6) return res.status(400).json({ message: 'Contraseña muy corta' });

      const existing = await User.findOne({ where: { email } });
      if (existing) return res.status(409).json({ message: 'Email ya registrado' });

      const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

      const user = await User.create({ name, email, password_hash, role: role || 'estudiante' });

      await LogAction.create({ user_id: user.id, action: 'register', meta: { ip: req.ip } });

      const token = signToken(user);

      return res.status(201).json({ message: 'Usuario creado', token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error servidor', error: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

      const match = await bcrypt.compare(password, user.password_hash);
      //if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });
      if (!user.checkPassword(password)) return res.status(401).json({ message: 'Credenciales inválidas' });


      // registrar intento
      await LogAction.create({ user_id: user.id, action: 'login', meta: { ip: req.ip } });

      if (user.mfa_enabled) {
        // generar tempToken
        const tempToken = signTempToken(user.id);
        return res.json({ mfaRequired: true, tempToken });
      }

      const token = signToken(user);
      return res.json({ token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error servidor' });
    }
  },

  async me(req, res) {
    try {
      const user = await User.findByPk(req.user.id, { attributes: ['id','name','email','role','mfa_enabled'] });
      return res.json({ user });
    } catch (err) {
      return res.status(500).json({ message: 'Error servidor' });
    }
  },

  // 🔒 Generar secret y QR para usuario (protegido)
  async mfaSetup(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

      const secret = mfaService.generateSecret();
      const encrypted = mfaService.encryptSecret(secret);

      // almacenar temporalmente en DB (no activado aún)
      user.mfa_secret = encrypted;
      await user.save();

      // generar QR data URL (opcional)
      const dataUrl = await mfaService.generateQRCodeDataURL(user.email, secret);

      return res.json({ message: 'Secreto generado', qr: dataUrl });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error generando MFA' });
    }
  },

  // 🔒 Verificar token TOTP. Si la petición viene con tempToken (login MFA flow) devuelve JWT final
  async mfaVerify(req, res) {
    try {
      const { code } = req.body;
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : (req.body.tempToken || null);

      if (!token) return res.status(401).json({ message: 'Token temporal requerido' });

      let payload;
      try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
      }

      const user = await User.findByPk(payload.id);
      if (!user || !user.mfa_secret) return res.status(400).json({ message: 'MFA no configurado' });

      const valid = mfaService.verifyToken(user.mfa_secret, code);
      if (!valid) return res.status(401).json({ message: 'Código inválido' });

      // Si el token era un tempToken (payload.temp), se trata de completar login
      if (payload.temp) {
        const finalToken = signToken(user);
        return res.json({ token: finalToken });
      }

      // Si no era temp token, entonces se usa para activar MFA: habilitar
      user.mfa_enabled = true;
      await user.save();
      return res.json({ message: 'MFA activado' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error verificando MFA' });
    }
  }
};


