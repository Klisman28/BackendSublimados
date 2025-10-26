const Joi = require('joi');

const id = Joi.number().integer();
const cashierId = Joi.number().integer();
const initBalance = Joi.number().precision(2)
// const totalBalance = Joi.number().precision(2);
// const startDatetime = Joi.date();
// const endDatetime = Joi.date();
const status = Joi.number().integer();

const offset = Joi.number().integer();
const limit = Joi.number().integer();
const search = Joi.string();
const sortColumn = Joi.string();
const sortDirection = Joi.string();

const createOpeningSchema = Joi.object({
    cashierId: cashierId.required(),
    initBalance: initBalance.required(),
    status: status
});

const updateOpeningSchema = Joi.object({
    cashierId: cashierId,
    initBalance: initBalance,
    status: status
});

const getOpeningSchema = Joi.object({
    id: id.required(),
});

const queryOpeningSchema = Joi.object({
    offset,
    limit,
    search,
    sortColumn,
    sortDirection
});

module.exports = {
    createOpeningSchema,
    getOpeningSchema,
    queryOpeningSchema,
    updateOpeningSchema
}