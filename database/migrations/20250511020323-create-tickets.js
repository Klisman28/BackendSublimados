'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tickets', {
      // Usamos 'id' como número de ticket
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fecha: {
        allowNull: false,
        type: Sequelize.DATE
      },
      // …otros campos de tu venta…
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('tickets');
  }
};
