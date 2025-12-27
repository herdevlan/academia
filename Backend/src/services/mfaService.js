//backend/src/services/mfaService.js


const { authenticator } = require('otplib');
const qrcode = require('qrcode');
const { encrypt, decrypt } = require('../utils/cryptoUtils');

authenticator.options = {
  window: parseInt(process.env.MFA_DEFAULT_WINDOW || '1'),
};

module.exports = {
  // Genera un secreto único (base32) para cada usuario
  generateSecret() {
    return authenticator.generateSecret();
  },

  // Genera QR para que el usuario lo escanee
  async generateQRCodeDataURL(userEmail, secret) {
    const otpauth = authenticator.keyuri(
      userEmail,
      'Academia', // nombre de tu app
      secret
    );
    return await qrcode.toDataURL(otpauth);
  },

  // Verifica token TOTP (acepta secretos cifrados o en claro)
  verifyToken(secretOrEncrypted, token) {
    let secret = secretOrEncrypted;

    try {
      if (secretOrEncrypted && secretOrEncrypted.includes(':')) {
        secret = decrypt(secretOrEncrypted);
      }
    } catch (_) {
      // si no se puede desencriptar, se usa el original
      secret = secretOrEncrypted;
    }

    return authenticator.check(token, secret);
  },

  // Cifra el secreto antes de guardarlo en la BD
  encryptSecret(secret) {
    return encrypt(secret);
  }
};











