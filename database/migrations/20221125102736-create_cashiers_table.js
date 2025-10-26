'use strict';

const { CASHIER_TABLE, CashierSchema } = require('../models/cashier.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CASHIER_TABLE, CashierSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CASHIER_TABLE);
  }
};
