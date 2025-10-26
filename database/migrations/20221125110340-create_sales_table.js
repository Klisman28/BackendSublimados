'use strict';

const { SALE_TABLE, SaleSchema } = require('../models/sale.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(SALE_TABLE, SaleSchema, {
      engine: 'InnoDB', // <--- Forzar motor

    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(SALE_TABLE);
  }
};
