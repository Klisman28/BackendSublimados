const { Model, DataTypes } = require('sequelize');

// Nombre de la tabla en la base de datos
const NOTE_TABLE = 'Notes';

// Definición del esquema de columnas
const NoteSchema = {
  id: {
    allowNull: true,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  text: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  completed: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Por defecto la nota está pendiente
  },
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: DataTypes.NOW,
  },
};

class Note extends Model {
  static associate(models) {
    // Aquí defines relaciones, por ejemplo, si tienes otra tabla
    // this.belongsTo(models.User, { ... });
  }

  static config(sequelize) {
    return {
      sequelize,              // instancia de conexión
      tableName: NOTE_TABLE, // nombre de la tabla
      modelName: 'Note',     // nombre del modelo
      timestamps: true       // indica que tendrá createdAt y updatedAt
    };
  }
}

module.exports = { NOTE_TABLE, NoteSchema, Note };
