'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subjects', {
      
      subjectCode: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      subjectName: {
        type: Sequelize.STRING
      },
      credit: {
        type: Sequelize.INTEGER
      },
      coe: {
        type: Sequelize.FLOAT
      },
      semeCode: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Subjects');
  }
};