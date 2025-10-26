const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(4).max(100);
const searchable = Joi.boolean();
const subcategoryId = Joi.number().integer();
const options = Joi.array();

const createPropertySchema = Joi.object({
  name: name.required(),
  searchable:searchable.required(),
  subcategoryId: subcategoryId.required(),
  options: options
});

const getPropertySchema = Joi.object({
  id: id.required(),
});

const queryPropertySchema = Joi.object({
  subcategoryId: subcategoryId.required()
});

module.exports = { createPropertySchema, getPropertySchema, queryPropertySchema }