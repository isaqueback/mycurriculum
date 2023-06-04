'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('roles', [
      { name: 'admin', created_at: new Date(), updated_at: new Date(), },
      { name: 'free_user', created_at: new Date(), updated_at: new Date(), },
      { name: 'basic_paid_user', created_at: new Date(), updated_at: new Date() },
      { name: 'pro_paid_user', created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
