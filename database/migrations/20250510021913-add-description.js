'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const [results] = await queryInterface.sequelize.query("SHOW COLUMNS FROM products LIKE 'description'");

        if (results.length === 0) {
            await queryInterface.addColumn('products', 'description', {
                type: Sequelize.TEXT,
                allowNull: true
            });
        }
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('products', 'description');
    }
};

