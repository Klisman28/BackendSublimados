'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ROLE_TABLE } = require('../models/role.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(ROLE_TABLE, [{
      name: 'admin',
    }, {
      name: 'cajero'
    }, {
      name: 'almacenero'
    },{
      name: 'gerente'
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
