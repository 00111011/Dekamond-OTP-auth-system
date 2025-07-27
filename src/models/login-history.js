'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LoginHistory extends Model {
    static associate(models) {
      LoginHistory.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
    }
  }

  LoginHistory.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    logged_in_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'LoginHistory',
    tableName: 'login_histories',
    underscored: true,
    timestamps: false
  });

  return LoginHistory;
};
