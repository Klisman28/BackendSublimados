'use strict';

const { ENTERPRISE_TABLE, EnterpriseSchema } = require('../models/enterprise.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ENTERPRISE_TABLE, EnterpriseSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ENTERPRISE_TABLE);
  }
};
