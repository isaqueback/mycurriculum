'use strict';

const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [{
      email: process.env.ADMIN_EMAIL,
      fullname: process.env.ADMIN_FULLNAME,
      date_of_birth: new Date(process.env.ADMIN_DATE_OF_BIRTH),
      password_hash: await bcrypt.hash(process.env.ADMIN_PASSWORD, 8),
      gender: process.env.ADMIN_GENDER,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});

    const permissionsId = (await queryInterface.sequelize.query('SELECT id FROM permissions'))[0].map(obj => obj.id)
    const adminRoleId = (await queryInterface.sequelize.query("SELECT id FROM roles WHERE name = 'admin'"))[0][0].id
    const userId = (await queryInterface.sequelize.query('SELECT id FROM users WHERE email = ?', {
      replacements: [process.env.ADMIN_EMAIL],
      type: queryInterface.sequelize.QueryTypes.SELECT
    }))[0].id

    await queryInterface.bulkInsert('users_roles', [
      {
        user_id: userId,
        role_id: adminRoleId,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ])

    await queryInterface.bulkInsert('users_permissions', permissionsId.map(id => {
      return {
        user_id: userId,
        permission_id: id,
        created_at: new Date(),
        updated_at: new Date(),
      }
    }))

    await queryInterface.bulkInsert('roles_permissions', permissionsId.map(id => {
      return {
        role_id: adminRoleId,
        permission_id: id,
        created_at: new Date(),
        updated_at: new Date(),
      }
    })

    )
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
