'use strict';

/** @type {import('sequelize-cli').Migration} */

const { UNIT_TABLE  } = require('../models/unit.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(UNIT_TABLE, [{
      name: 'unidad',
      symbol: 'ud.'
    }, {
      name: 'Kilogramos',
      symbol: 'Kg'
    }, {
      name: 'Metros',
      symbol: 'm'
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
