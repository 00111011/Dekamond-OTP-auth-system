'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      phone_number: {
        type: Sequelize.DataTypes.STRING(10),
         allowNull: false,
         unique: true,
         validate: {
         is: /^\d{10}$/
      }
      },
      registered_at: {
        type: Sequelize.DataTypes.DATE,
         allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};