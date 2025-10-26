'use strict';

const { CONFIG_TABLE, ConfigSchema } = require('../models/config.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CONFIG_TABLE, ConfigSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CONFIG_TABLE);
  }
};
