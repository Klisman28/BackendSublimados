const { Model, DataTypes } = require('sequelize');
const { PROPERTY_TABLE } = require('./property.model');

const OPTION_TABLE = 'options';

const OptionSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    value: {
        allowNull: true,
        type: DataTypes.STRING,
        get() {
            const newValue = this.getDataValue('value');
            return newValue[0].toUpperCase() + newValue.slice(1);
        },
        set(value) {
            this.setDataValue('value', value.toLowerCase().trim());
        }
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
    }
}

class Option extends Model {
    static associate(models) {
        this.belongsTo(models.Property, {
            as: 'property'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: OPTION_TABLE,
            modelName: 'Option',
            timestamps: false
        }
    }
}

module.exports = { OPTION_TABLE, OptionSchema, Option }