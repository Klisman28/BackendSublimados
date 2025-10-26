// schemas/ticket.schema.js
const Joi = require('joi');

const createTicketSchema = Joi.object({
  tipo:  Joi.string().required(),
  fecha: Joi.date().required(),
  // ¡ojo! NO definimos numero/id aquí, lo genera la BD
});

module.exports = { createTicketSchema };
