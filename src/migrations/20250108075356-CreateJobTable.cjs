'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable("Jobs",{
      id:{
        type: new Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
      },
      title:{
        type: new Sequelize.STRING,
        allowNull: false
      },
      type:{
        type: new Sequelize.STRING,
        allowNull: false
      },
      description:{
        type: new Sequelize.STRING,
        allowNull: false
      },
      location:{
        type: new Sequelize.STRING,
        allowNull: false
      },
      salary:{
        type: new Sequelize.STRING,
        allowNull: false
      },
      company_id:{
        type: new Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Companies',
            schema: 'public',
          },
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false
      },
      user_id:{
        type: new Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'Users',
            schema: 'public',
          },
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false
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
    await queryInterface.dropTable("Jobs");
  }
};
