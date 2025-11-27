'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.belongsTo(models.User, { foreignKey: 'usuario_id', as: 'user' });
    }
  }
  Student.init({
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nivel_academico: {
      type: DataTypes.STRING,
      allowNull: false
    },
    curso_actual: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};
