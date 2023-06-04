'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const permissionsId = (await queryInterface.sequelize.query(
      "SELECT * FROM permissions WHERE name IN ('create_user', 'read_user', 'update_user', 'delete_user', 'read_curriculum', 'delete_curriculum')"
    ))[0].map(obj => obj.id)
    const freeRoleId = (await queryInterface.sequelize.query("SELECT id FROM roles WHERE name = 'free_user'"))[0][0].id

    await queryInterface.bulkInsert('roles_permissions', permissionsId.map(id => {
      return {
        role_id: freeRoleId,
        permission_id: id,
        created_at: new Date(),
        updated_at: new Date(),
      }
    }))
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roles_permissions', null, {});
  }
};
