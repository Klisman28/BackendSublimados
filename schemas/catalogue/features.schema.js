const Joi = require('joi');

const id = Joi.number().integer();
const value = Joi.string().min(4).max(255);
const productId = Joi.number().integer();
const optionId = Joi.number().integer();

const createFeatureSchema = Joi.object({
    value: value.required(),
    productId: productId,
    optionId: optionId
});

const getFeatureSchema = Joi.object({
  id: id.required(),
});

const queryFeatureSchema = Joi.object({
    productId: productId.required()
});

module.exports = { createFeatureSchema, getFeatureSchema, queryFeatureSchema }