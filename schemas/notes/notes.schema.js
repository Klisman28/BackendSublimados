const Joi = require('joi');

// Para crear (POST)
const createNoteSchema = Joi.object({
  text: Joi.string().required()
});

// Para actualizar (PUT)
const updateNoteSchema = Joi.object({
  text: Joi.string().required()
});

// Para el ID en params
const getNoteSchema = Joi.object({
  id: Joi.number().integer().required()
});

module.exports = { createNoteSchema, updateNoteSchema, getNoteSchema };
