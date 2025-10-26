'use strict';

const { PRODUCT_PURCHAS_TABLE, ProductPurchasSchema } = require('../models/product-purchas.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(PRODUCT_PURCHAS_TABLE, ProductPurchasSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(PRODUCT_PURCHAS_TABLE);
  }
};
