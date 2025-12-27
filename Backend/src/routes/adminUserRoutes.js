const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

// ABM SOLO ADMIN
router.get('/', authMiddleware, isAdmin, userController.getUsers);
router.post('/', authMiddleware, isAdmin, userController.createUser);
router.put('/:id', authMiddleware, isAdmin, userController.updateUser);
router.delete('/:id', authMiddleware, isAdmin, userController.deleteUser);

module.exports = router;
