'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Companies",{
      id:{
        type: new Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name:{
        type: new Sequelize.STRING,
        allowNull: false
      },
      description:{
        type: new Sequelize.STRING,
        allowNull: false
      },
      contact_email:{
        type: new Sequelize.STRING,
        allowNull: false
      },
      contact_phone:{
        type: new Sequelize.STRING,
        allowNull: false
      },
      website:{
        type: new Sequelize.STRING,
        allowNull: true
      },
      createdAt:{
        type: new Sequelize.DATE,
        allowNull: true
      },
      updatedAt:{
        type: new Sequelize.DATE,
        allowNull: true
      },
      deletedAt:{
        type: new Sequelize.DATE,
        allowNull: true
      },
    },{schema:"public"});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Companies");
  }
};
