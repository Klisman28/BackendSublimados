'use strict';

const { BRAND_TABLE, BrandSchema } = require('../models/brand.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(BRAND_TABLE, BrandSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(BRAND_TABLE);
  }
};
