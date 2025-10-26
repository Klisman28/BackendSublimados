const { Model, DataTypes } = require('sequelize');

const ENTERPRISE_TABLE = 'enterprises';

const EnterpriseSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    ruc: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: true,
    },
    email: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    telephone: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    }
}

class Enterprise extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: ENTERPRISE_TABLE,
            modelName: 'Enterprise',
            timestamps: false
        }
    }
}

module.exports = { ENTERPRISE_TABLE, EnterpriseSchema, Enterprise }