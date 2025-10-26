const Joi = require('joi');

const id = Joi.number().integer();
const serie = Joi.string().max(3);
const number = Joi.string();
const dateIssue = Joi.date();
const saleableType = Joi.string();
const saleableId = Joi.number().integer();
const type = Joi.string();
const igv = Joi.number().precision(2)
const total = Joi.number().precision(2);
const status = Joi.number().integer().positive();
const products = Joi.array().min(1);
const openingId = Joi.number().integer();

const offset = Joi.number().integer();
const limit = Joi.number().integer();
const search = Joi.string();
const sortColumn = Joi.string();
const sortDirection = Joi.string();
const filterField = Joi.string();
const filterType = Joi.string();
const filterValue = Joi.string();

const createSaleSchema = Joi.object({
    serie: serie,
    number: number.required(),
    dateIssue: dateIssue.required(),
    saleableType: saleableType,
    saleableId: saleableId,
    type: type.required(),
    igv: igv,
    total: total.required(),
    status,
    openingId: openingId.required(),
    products: products.required(),
});

const updateSaleSchema = Joi.object({
    status: status.required()
});

const getSaleByOpeningSchema = Joi.object({
    openingId: openingId.required(),
});

const getSaleSchema = Joi.object({
    id: id.required(),
});

const querySaleSchema = Joi.object({
    offset,
    limit,
    search,
    sortColumn,
    sortDirection,
    filterField,
    filterType,
    filterValue
});

module.exports = {
    createSaleSchema,
    getSaleSchema,
    querySaleSchema,
    updateSaleSchema,
    getSaleByOpeningSchema
}