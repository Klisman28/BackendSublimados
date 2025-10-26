const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(100);
const firstLastname = Joi.string().min(3).max(100);
const secondLastname = Joi.string().min(3).max(100);
const dni = Joi.string();
const email = Joi.string().email();
const telephone = Joi.string();
const address = Joi.string();

const offset = Joi.number().integer();
const limit = Joi.number().integer();
const search = Joi.string();
const sortColumn = Joi.string();
const sortDirection = Joi.string();

const createCustomerSchema = Joi.object({
    name: name.required(),
    firstLastname: firstLastname.required(),
    secondLastname,
    dni,
    email,
    telephone,
    address
});

const getCustomerSchema = Joi.object({
    id: id.required(),
});

const queryCustomerSchema = Joi.object({
    offset,
    limit,
    search,
    sortColumn,
    sortDirection
});

module.exports = { createCustomerSchema, getCustomerSchema, queryCustomerSchema }