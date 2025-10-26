'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'expiration_date');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'expiration_date', {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });
  }
};
