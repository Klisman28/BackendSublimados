const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(4).max(100);
const slug = Joi.string();
const code = Joi.string();
const categoryId = Joi.number().integer();
// const brands = Joi.array().min(1);

const offset = Joi.number().integer();
const limit = Joi.number().integer();
const search = Joi.string();
const sortColumn = Joi.string();
const sortDirection = Joi.string();

const createSubcategorySchema = Joi.object({
  name: name.required(),
  slug: slug,
  code: code.required(),
  categoryId: categoryId.required(),
  // brands: brands
});

const getSubcategorySchema = Joi.object({
  id: id.required(),
});

const querySubcategorySchema = Joi.object({
  offset,
  limit,
  search,
  sortColumn,
  sortDirection
});

module.exports = { createSubcategorySchema, getSubcategorySchema, querySubcategorySchema }