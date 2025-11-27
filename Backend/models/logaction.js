'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LogAction extends Model {
    static associate(models) {
      LogAction.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  LogAction.init({
    user_id: DataTypes.INTEGER,
    action: DataTypes.STRING,
    meta: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'LogAction',
  });
  return LogAction;
};
