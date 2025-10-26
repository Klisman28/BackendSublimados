'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Quitar la restricción única en la columna dni
    //    Si la restricción tenía un nombre específico, lo usas aquí.
    //    A menudo, Sequelize nombra la constraint de forma automática:
    //    <tabla>_<columna>_key
    //    Si no estás seguro, revisa tu base o revisa tu migración inicial.

    await queryInterface.removeConstraint('customers', 'customers_dni_key')
      .catch(() => console.log('Constraint ya no existe o tenía otro nombre'));

    // 2. Cambiar la columna para que no sea única y 
    //    por ejemplo, que sea STRING sin límite fijo:
    await queryInterface.changeColumn('customers', 'dni', {
      type: Sequelize.STRING,   // sin min/max
      allowNull: true,
      unique: false
    });
  },

};
