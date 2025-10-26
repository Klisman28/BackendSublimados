'use strict';

/** @type {import('sequelize-cli').Migration} */

const { USER_TABLE } = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = "12341234";
    const passwordHash = await bcrypt.hash(password, 10);

    await queryInterface.bulkInsert(USER_TABLE, [{
      username: 'admin',
      password: passwordHash,
      status: true,
      userable_type: 'employees',
      userable_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
