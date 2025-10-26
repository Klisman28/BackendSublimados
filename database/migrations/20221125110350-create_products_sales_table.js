'use strict';

const { PRODUCT_SALE_TABLE, ProductSaleSchema } = require('../models/product-sale.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(PRODUCT_SALE_TABLE, ProductSaleSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(PRODUCT_SALE_TABLE);
  }
};
