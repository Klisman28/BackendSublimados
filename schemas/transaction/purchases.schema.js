const Joi = require('joi');

const id = Joi.number().integer();
const supplierId = Joi.number().integer();
const igv = Joi.number().precision(2)
const total = Joi.number().precision(2);
const dateIssue = Joi.date();
const products = Joi.array().min(1);

const offset = Joi.number().integer();
const limit = Joi.number().integer();
const search = Joi.string();
const sortColumn = Joi.string();
const sortDirection = Joi.string();

const createPurchasSchema = Joi.object({
    supplierId: supplierId.required(),
    igv: igv,
    total: total.required(),
    dateIssue: dateIssue.required(),
    products: products.required()
});

const getPurchasSchema = Joi.object({
    id: id.required(),
});

const queryPurchasSchema = Joi.object({
    offset,
    limit,
    search,
    sortColumn,
    sortDirection
});

module.exports = { createPurchasSchema, getPurchasSchema, queryPurchasSchema }