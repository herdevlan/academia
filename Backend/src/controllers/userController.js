const { User } = require('../../models');

/**
 * LISTAR USUARIOS
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password_hash', 'mfa_secret']
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * CREAR USUARIO (ALTA)
 */
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.create({
      name,
      email,
      password, // 🔐 virtual → genera password_hash automáticamente
      role
    });

    res.status(201).json({
      message: 'Usuario creado correctamente',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * MODIFICAR USUARIO
 */
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, mfa_enabled } = req.body;

    await User.update(
      { name, email, role, mfa_enabled },
      { where: { id } }
    );

    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * ELIMINAR USUARIO (BAJA)
 */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.destroy({ where: { id } });

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
