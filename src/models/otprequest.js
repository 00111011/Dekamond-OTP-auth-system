'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OtpRequest extends Model {
    static associate(models) {
      OtpRequest.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
    }
  }

  OtpRequest.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    requested_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'OtpRequest',
    tableName: 'otp_requests',
    underscored: true,
    timestamps: false
  });

  return OtpRequest;
};
