const { Model, DataTypes } = require('sequelize');

const CONFIG_TABLE = 'configs';

const ConfigSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    invoceSerie: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'invoce_serie'
    },
    invoceNum: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'invoce_num'
    },
    boletaSerie: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'boleta_serie'
    },
    boletaNum: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'boleta_num'
    },
    ticketNum: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'ticket_num'
    },
}

class Config extends Model {

    static config(sequelize) {
        return {
            sequelize,
            tableName: CONFIG_TABLE,
            modelName: 'Config',
            timestamps: false
        }
    }
}

module.exports = { CONFIG_TABLE, ConfigSchema, Config }