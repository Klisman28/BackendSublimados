'use strict';

const { PURCHAS_TABLE, PurchasSchema } = require('../models/purchas.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(PURCHAS_TABLE, PurchasSchema, {
      engine: 'InnoDB', // <--- Forzar motor

    });
  },

  async down (queryInterface) {
    await queryInterface.dropTtable(PURCHAS_TABLE);
  }
};
