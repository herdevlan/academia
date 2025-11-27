'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs'); // o bcrypt

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Student, { foreignKey: 'usuario_id', as: 'student' });
    }

    // Método para verificar contraseña
    checkPassword(password) {
      return bcrypt.compareSync(password, this.password_hash);
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.VIRTUAL, // No se guarda en la DB
      set(value) {
        this.setDataValue('password', value);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue('password_hash', hash); // Se guarda en DB
      }
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('docente', 'administrador', 'estudiante'),
      allowNull: false
    },
    mfa_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    mfa_secret: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
