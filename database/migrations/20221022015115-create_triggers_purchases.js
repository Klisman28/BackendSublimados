// migrations/XXXX-create_triggers_purchases.js
'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TRIGGER BI_products_purchases_increment_stock
      AFTER INSERT
      ON products_purchases
      FOR EACH ROW
      UPDATE products
        SET stock = stock + NEW.quantity
        WHERE id = NEW.product_id;
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS BI_products_purchases_increment_stock;
    `);
  }
};
