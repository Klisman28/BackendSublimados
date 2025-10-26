'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ROLE_USER_TABLE } = require('../models/role-user.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(ROLE_USER_TABLE, [{
      role_id: 1,
      user_id: 1
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
