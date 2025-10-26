const { Model, DataTypes } = require('sequelize');
const { SUBCATEGORY_TABLE } = require('./subcategory.model');

const PROPERTY_TABLE = 'properties';

const PropertySchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: true,
        type: DataTypes.STRING,
        get() {
            const newValue = this.getDataValue('name');
            return newValue[0].toUpperCase() + newValue.slice(1);
        },
        set(value) {
            this.setDataValue('name', value.toLowerCase().trim());
        }
    },
    searchable: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
    },
    subcategoryId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'subcategory_id',
        references: {
            model: SUBCATEGORY_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}

class Property extends Model {
    static associate(models) {
        this.belongsTo(models.Subcategory, {
            as: 'subcategory'
        });

        this.hasMany(models.Option, {
            as: 'options',
            foreignKey: 'propertyId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PROPERTY_TABLE,
            modelName: 'Property',
            timestamps: false
        }
    }
}

module.exports = { PROPERTY_TABLE, PropertySchema, Property }