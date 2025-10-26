// migrations/XXXXXXXXXXXX-create_roles_users_table.js
'use strict';

const { ROLE_USER_TABLE, RoleUserSchema } = require('../models/role-user.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ROLE_USER_TABLE, RoleUserSchema, {
      engine: 'InnoDB'
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ROLE_USER_TABLE);
  }
};
