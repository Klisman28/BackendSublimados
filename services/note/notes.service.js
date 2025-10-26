// services/notes.service.js

const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../../libs/sequelize');

class NotesService {
  async find(query) {
    // Extrae los filtros y opciones desde la query
    const { limit, offset, search, sortColumn, sortDirection } = query;

    // Opciones de búsqueda para findAll
    const options = {
      order: [(sortColumn) ? [sortColumn, sortDirection] : ['id', 'DESC']]
    };

    // Opciones de búsqueda para count (solo queremos contar cuántos hay)
    const optionsCount = {};

    // Paginación
    if (limit && offset) {
      options.limit = parseInt(limit);
      options.offset = parseInt(offset);
    }

    // Búsqueda por texto
    if (search) {
      options.where = {
        text: {
          [Op.like]: `%${search}%`
        }
      };

      optionsCount.where = {
        text: {
          [Op.like]: `%${search}%`
        }
      };
    }

    // Consultamos las notas
    const notes = await models.Note.findAll(options);
    // Obtenemos el total de registros que coinciden con los mismos filtros
    const total = await models.Note.count(optionsCount);

    return { notes, total };
  }

  async create(data) {
    // Creamos una nueva nota
    const note = await models.Note.create(data);
    return note;
  }

  async findOne(id) {
    // Buscamos la nota por su ID
    const note = await models.Note.findByPk(id);
    if (!note) {
      throw boom.notFound('No se encontró ninguna nota con ese ID');
    }
    return note;
  }

  async update(id, changes) {
    // Primero verificamos si existe
    let note = await this.findOne(id);
    // Actualizamos la nota con los cambios
    note = await note.update(changes);
    return note;
  }

  async delete(id) {
    // Primero verificamos si existe
    const note = await this.findOne(id);
    // La eliminamos de la BD
    await note.destroy();
    return { id };
  }
}

module.exports = NotesService;
