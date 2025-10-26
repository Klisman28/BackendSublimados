const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(100);
const ruc = Joi.string().allow('');       
const website = Joi.string();
const email = Joi.string().email().allow(''); // Permite vacío para email
const telephone = Joi.string();
const address = Joi.string();

const offset = Joi.number().integer();
const limit = Joi.number().integer();
const search = Joi.string();
const sortColumn = Joi.string();
const sortDirection = Joi.string();

const createSupplierSchema = Joi.object({
    name: name.required(),
    ruc, // Ya es opcional, pero se permite vacío con .allow('')
    email, // Igual que arriba, permite vacío
    website,
    telephone,
    address
});

const getSupplierSchema = Joi.object({
    id: id.required(),
});

const querySupplierSchema = Joi.object({
    offset,
    limit,
    search,
    sortColumn,
    sortDirection
});

module.exports = { createSupplierSchema, getSupplierSchema, querySupplierSchema }