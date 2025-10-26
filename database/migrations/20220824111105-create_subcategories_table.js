'use strict';

const { SUBCATEGORY_TABLE, SubcategorySchema } = require('../models/subcategory.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(SUBCATEGORY_TABLE, SubcategorySchema,{
      engine: 'InnoDB', // <--- Forzar motor

    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(SUBCATEGORY_TABLE);
  }
};
