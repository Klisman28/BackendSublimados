const { Model, DataTypes } = require('sequelize');

const ROLE_TABLE = 'roles';

const RoleSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: true,
    }
}

class Role extends Model {
     static associate() {

     }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ROLE_TABLE,
            modelName: 'Role',
            timestamps: false
        }
    }
}

module.exports = { ROLE_TABLE, RoleSchema, Role}