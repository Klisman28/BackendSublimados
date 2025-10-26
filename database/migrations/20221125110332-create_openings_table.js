'use strict';

/** @type {import('sequelize-cli').Migration} */

const { OPENING_TABLE, OpeningSchema } = require("../models/opening.model");

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(OPENING_TABLE, OpeningSchema, {
      engine: 'InnoDB', // <--- Forzar motor

    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable(OPENING_TABLE)
  }
};
