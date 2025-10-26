// /migrations/XXXXXXXXXXXXXX-add-expiration-date-to-products.js
'use strict';

const { PRODUCT_TABLE } = require('../models/product.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(PRODUCT_TABLE, 'expiration_date', {
      allowNull: true,            // cámbialo a false si TODOS los productos deben tener fecha
      type: Sequelize.DATEONLY
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(PRODUCT_TABLE, 'expiration_date');
  }
};
