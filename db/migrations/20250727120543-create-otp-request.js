'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   await queryInterface.createTable('otp_requests', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  requested_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW')
  }
});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OtpRequests');
  }
};