'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('permissions', [
      { name: 'create_user', created_at: new Date(), updated_at: new Date() },
      { name: 'read_user', created_at: new Date(), updated_at: new Date() },
      { name: 'update_user', created_at: new Date(), updated_at: new Date() },
      { name: 'delete_user', created_at: new Date(), updated_at: new Date() },
      { name: 'read_users', created_at: new Date(), updated_at: new Date() },
      { name: 'create_curriculum', created_at: new Date(), updated_at: new Date() },
      { name: 'read_curriculum', created_at: new Date(), updated_at: new Date() },
      { name: 'update_curriculum', created_at: new Date(), updated_at: new Date() },
      { name: 'delete_curriculum', created_at: new Date(), updated_at: new Date() },
      { name: 'download_curriculum', created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('permissions', null, {});
  }
};
