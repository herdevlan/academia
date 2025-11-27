const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas públicas
router.post('/register', register);
router.post('/login', login);

// Ruta protegida
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Ruta protegida', user: req.user });
});

module.exports = router;
