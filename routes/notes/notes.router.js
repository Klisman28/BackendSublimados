const express = require('express');
const NotesService = require('../../services/note/notes.service');
const validatorHandler = require('../../middlewares/validator.handler');
const {
    createNoteSchema,
    updateNoteSchema,
    getNoteSchema
  } = require('../../schemas/notes/notes.schema');
  const { success } = require('../response');

const router = express.Router();
const service = new NotesService();


// ===================================
// Obtener todas las notas
// ===================================
router.get('/', 
    async (req, res, next) => {
      try {
        // Puedes pasarle `req.query` si deseas admitir paginación, búsqueda, etc.
        const data = await service.find(req.query);
        // data es { notes, total }, según lo que retorne tu servicio
        success(res, data);  
      } catch (error) {
        next(error);
      }
    }
  );
  
  // ===================================
  // Crear una nueva nota
  // ===================================
  router.post('/',
    validatorHandler(createNoteSchema, 'body'),
    async (req, res, next) => {
      try {
        const body = req.body;
        const newNote = await service.create(body);
        // Retorna la nota recién creada
        success(res, newNote, 201); 
      } catch (error) {
        next(error);
      }
    }
  );
  
  // ===================================
  // Actualizar una nota
  // ===================================
  router.put('/:id',
    validatorHandler(getNoteSchema, 'params'),   // Valida que id sea numérico
    validatorHandler(updateNoteSchema, 'body'),  // Valida que text exista
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const changes = req.body; // e.g. { text: 'Nuevo contenido' }
        const updatedNote = await service.update(id, changes);
        success(res, updatedNote);
      } catch (error) {
        next(error);
      }
    }
  );
  
  // ===================================
  // Eliminar una nota
  // ===================================
  router.delete('/:id',
    validatorHandler(getNoteSchema, 'params'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const rta = await service.delete(id);
        success(res, rta);
      } catch (error) {
        next(error);
      }
    }
  );
  
  module.exports = router;