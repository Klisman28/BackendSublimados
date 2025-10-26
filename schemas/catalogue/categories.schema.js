const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(4).max(100);
const code = Joi.string();
const slug = Joi.string();

const offset = Joi.number().integer();
const limit = Joi.number().integer();
const search = Joi.string();
const sortColumn = Joi.string();
const sortDirection = Joi.string();

const createCategorySchema = Joi.object({
  name: name.required(),
  code: code.required(),
  slug: slug,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

const queryCategorySchema = Joi.object({
  offset,
  limit,
  search,
  sortColumn,
  sortDirection
});

module.exports = { createCategorySchema, getCategorySchema, queryCategorySchema }