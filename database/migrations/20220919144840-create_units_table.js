'use strict';

const { UNIT_TABLE, UnitSchema } = require('../models/unit.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(UNIT_TABLE, UnitSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(UNIT_TABLE);
  }
};
