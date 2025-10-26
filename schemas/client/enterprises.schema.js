const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(100);
const ruc = Joi.string();
const email = Joi.string().email();
const telephone = Joi.string();
const address = Joi.string();

const offset = Joi.number().integer();
const limit = Joi.number().integer();
const search = Joi.string();
const sortColumn = Joi.string();
const sortDirection = Joi.string();

const createEnterpriseSchema = Joi.object({
    name: name.required(),
    ruc,
    email,
    telephone: telephone.required(),
    address
});

const getEnterpriseSchema = Joi.object({
    id: id.required(),
});

const queryEnterpriseSchema = Joi.object({
    offset,
    limit,
    search,
    sortColumn,
    sortDirection
});

module.exports = { createEnterpriseSchema, getEnterpriseSchema, queryEnterpriseSchema }