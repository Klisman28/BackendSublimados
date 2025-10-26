const Joi = require('joi');

const id = Joi.number().integer();
const invoceSerie = Joi.string();
const invoceNum = Joi.number().integer();
const boletaSerie = Joi.string();
const boletaNum = Joi.number().integer();
const ticketNum = Joi.number().integer();


const createConfigSchema = Joi.object({
    invoceSerie: invoceSerie.required(),
    invoceNum: invoceNum.required(),
    boletaSerie: boletaSerie.required(),
    boletaNum: boletaNum.required(),
    ticketNum: ticketNum.required(),
});

const getConfigSchema = Joi.object({
    id: id.required()
});

module.exports = { createConfigSchema, getConfigSchema }