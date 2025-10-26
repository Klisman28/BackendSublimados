const { Model, DataTypes } = require('sequelize');
const TICKET_TABLE = 'tickets';

const TicketSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  tipo: {
    allowNull: false,
    type: DataTypes.STRING
  },
  fecha: {
    allowNull: false,
    type: DataTypes.DATE
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    field: 'updated_at',
    allowNull: false,
    type: DataTypes.DATE
  }
};

class Ticket extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: TICKET_TABLE,
      modelName: 'Ticket',
      timestamps: true  // para createdAt / updatedAt
    };
  }
}

module.exports = { TICKET_TABLE, TicketSchema, Ticket };
