'use strict';

const { CATEGORY_TABLE, CategorySchema } = require("../models/category.model");

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema, {
      engine: 'InnoDB', // <--- Forzar motor

    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CATEGORY_TABLE);
  }
};
