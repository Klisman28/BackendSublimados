const { Model, DataTypes } = require('sequelize');
const { PRODUCT_TABLE } = require('./product.model');
const { OPTION_TABLE } = require('./option.model');
const { PROPERTY_TABLE } = require('./property.model');

const FEATURE_TABLE = 'features';

const FeatureSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    value: {
        type: DataTypes.STRING,
    },
    productId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'product_id',
        references: {
            model: PRODUCT_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    propertyId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'property_id',
        references: {
            model: PROPERTY_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    optionId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'option_id',
        references: {
            model: OPTION_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}

class Feature extends Model {
    static associate(models) {
        this.belongsTo(models.Option, {
            as: 'option'
        });

        this.belongsTo(models.Property, {
            as: 'property'
        });

        this.belongsTo(models.Product, {
            as: 'product'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: FEATURE_TABLE,
            modelName: 'Feature',
            timestamps: false
        }
    }
}

module.exports = { FEATURE_TABLE, FeatureSchema, Feature }