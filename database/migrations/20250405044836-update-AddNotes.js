'use strict';
const { NOTE_TABLE, NoteSchema } = require('../models/note.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    // Crear la tabla "Notes" con las columnas definidas en NoteSchema
    await queryInterface.createTable(NOTE_TABLE, NoteSchema);
  },

  async down (queryInterface) {
    // Borrar la tabla en caso de querer revertir
    await queryInterface.dropTable(NOTE_TABLE);
  }
};
