// Backend/src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController'); // Controlador de auth
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware JWT

// 🔹 Rutas públicas
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

// 🔹 Rutas protegidas
router.get('/profile', authMiddleware, authCtrl.me);

// 🔹 MFA: setup (requiere token) y verify
router.post('/mfa/setup', authMiddleware, authCtrl.mfaSetup);
router.post('/mfa/verify', authCtrl.mfaVerify);

module.exports = router;
