const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// registro y login
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

// ruta para probar token
router.get('/me', authMiddleware, authCtrl.me);

// MFA: setup (protegida) y verify
router.post('/mfa/setup', authMiddleware, authCtrl.mfaSetup); // 🔒
router.post('/mfa/verify', authCtrl.mfaVerify); // verifica tanto con tempToken (login) como con token normal (activar)

module.exports = router;

