const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const status = Joi.number().integer()
const code = Joi.string();

const offset = Joi.number().integer();
const limit = Joi.number().integer();
const search = Joi.string();
const sortColumn = Joi.string();
const sortDirection = Joi.string();

const createCashierSchema = Joi.object({
    name: name.required(),
    status: status,
    code,
});

const getCashierSchema = Joi.object({
    id: id.required(),
});

const queryCashierSchema = Joi.object({
    offset,
    limit,
    search,
    sortColumn,
    sortDirection
});

module.exports = { createCashierSchema, getCashierSchema, queryCashierSchema }