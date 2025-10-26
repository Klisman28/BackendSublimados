'use strict';

/** @type {import('sequelize-cli').Migration} */

const { CONFIG_TABLE } = require('../models/config.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(CONFIG_TABLE, [{
      invoce_serie: 1,
      invoce_num: 1,
      boleta_serie: 1,
      boleta_num: 1,
      ticket_num: 1
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
