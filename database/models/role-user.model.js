const { Model, DataTypes } = require('sequelize');

const { ROLE_TABLE } = require('./role.model');
const { USER_TABLE } = require('./user.model');

const ROLE_USER_TABLE = 'roles_users';

const RoleUserSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  roleId: {
    field: 'role_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: ROLE_TABLE, // 'roles'
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  userId: {
    field: 'user_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE, // 'users'
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}

class RoleUser extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLE_USER_TABLE,
      modelName: 'RoleUser',
      timestamps: false
    }
  }
}

module.exports = { RoleUser, RoleUserSchema, ROLE_USER_TABLE };