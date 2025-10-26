'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
 
    await queryInterface.addColumn('products', 'expirationDate', {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'hasExpiration');
    await queryInterface.removeColumn('products', 'expirationDate');
    
  },
};
