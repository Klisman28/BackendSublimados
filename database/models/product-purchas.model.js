const { Model, DataTypes } = require('sequelize');
const { PRODUCT_TABLE } = require('./product.model');
const { PURCHAS_TABLE } = require('./purchas.model');

const   PRODUCT_PURCHAS_TABLE = 'products_purchases';

const ProductPurchasSchema = {
    productId: {
        field: 'product_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: PRODUCT_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    purchasId: {
        field: 'purchas_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: PURCHAS_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    quantity: {
        allowNull: true,
        type: DataTypes.INTEGER(),
    },
    unitCost: {
        allowNull: true,
        type: DataTypes.DECIMAL(8,2),
        field: "unit_cost"
    }
}

class ProductPurchas extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: PRODUCT_PURCHAS_TABLE,
            modelName: 'ProductPurchas',
            timestamps: false
        }
    }
}

module.exports = { PRODUCT_PURCHAS_TABLE, ProductPurchasSchema, ProductPurchas };