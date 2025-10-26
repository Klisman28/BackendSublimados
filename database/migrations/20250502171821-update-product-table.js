'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('products', 'hasExpiration', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });

    await queryInterface.addColumn('products', 'expirationDate', {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });

 
  },

  async down(queryInterface, Sequelize) {
    // Deshacer los cambios en caso de rollback
    await queryInterface.removeColumn('products', 'hasExpiration');
    await queryInterface.removeColumn('products', 'expirationDate');

  },
};
