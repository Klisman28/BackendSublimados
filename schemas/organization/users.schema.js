const Joi = require('joi');

const id = Joi.number().integer();
const username = Joi.string().min(4);
const password = Joi.string().min(8);
const passwordConfirmation = Joi.string();
const status = Joi.boolean();
const userableId = Joi.number().integer();
const userableType = Joi.string();
const roles = Joi.array().min(1);

const offset = Joi.number().integer();
const limit = Joi.number().integer();
const search = Joi.string();
const sortColumn = Joi.string();
const sortDirection = Joi.string();

const createUserSchema = Joi.object({
    username: username.required(),
    password: password.required(),
    status: status.required(),
    userableId,
    userableType,
    passwordConfirmation: passwordConfirmation,
    roles: roles.required()
});

const updateUserSchema = Joi.object({
    username: username,
    status: status,
    userableId: userableId,
    userableType: userableType,
    roles: roles
});

const getUserSchema = Joi.object({
    id: id.required(),
});

const queryUserSchema = Joi.object({
    offset,
    limit,
    search,
    sortColumn,
    sortDirection
});

const toggleStatusUserSchema = Joi.object({
    status: status.required(),
});

const updatePasswordSchema = Joi.object({
    password: password.required(),
    passwordConfirmation: passwordConfirmation,
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema,queryUserSchema, toggleStatusUserSchema, updatePasswordSchema }