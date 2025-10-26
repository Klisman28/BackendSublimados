'use strict';

const { EMPPLOYEE_TABLE, EmployeeSchema} = require('../models/employee.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(EMPPLOYEE_TABLE, EmployeeSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(EMPPLOYEE_TABLE);
  }
};
