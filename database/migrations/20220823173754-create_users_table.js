'use strict';

const { USER_TABLE, UserSchema } = require('../models/user.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema, {
      engine: 'InnoDB', // <--- Forzar motor

    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
  }
};
