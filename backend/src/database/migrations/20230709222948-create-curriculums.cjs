'use strict';
// Alterar allowNull para false

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('curriculums', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      cell_phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      telephone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      linkedin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      twitter: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      facebook: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      github: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dribbble: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      youtube: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      drivers_license: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      custom_personal_datum_1: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      custom_personal_datum_2: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      skills: {
        type: Sequelize.ARRAY(Sequelize.STRING(50)),
        allowNull: true,
      },
      languages: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      about_me: {
        type: Sequelize.STRING(400),
        allowNull: true,
      },
      professional_experiences: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      educations: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      custom_topic_1: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      custom_topic_2: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    },);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('curriculums');
  }
};