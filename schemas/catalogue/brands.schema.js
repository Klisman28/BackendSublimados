const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const slug = Joi.string();
const code = Joi.string().min(2);

const offset = Joi.number().integer();
const limit = Joi.number().integer();
const search = Joi.string();
const sortColumn = Joi.string();
const sortDirection = Joi.string();

const createBrandSchema = Joi.object({
  name: name.required(),
  code: code.required(),
  slug: slug,
});

const getBrandSchema = Joi.object({
  id: id.required(),
});

const queryBrandSchema = Joi.object({
  offset,
  limit,
  search,
  sortColumn,
  sortDirection
});

module.exports = { createBrandSchema, getBrandSchema, queryBrandSchema }