// migrations/xxxxxx-create_triggers_sales.js
'use strict';

module.exports = {
  async up(queryInterface) {
    // Si es solo una sentencia en el trigger:
    await queryInterface.sequelize.query(`
      CREATE TRIGGER BI_products_sales_decrement_stock
      AFTER INSERT
      ON products_sales
      FOR EACH ROW
      UPDATE products
        SET stock = stock - NEW.quantity
        WHERE id = NEW.product_id;
    `);
  },

  async down(queryInterface) {
    // para revertir el trigger
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS BI_products_sales_decrement_stock;
    `);
  },
};

