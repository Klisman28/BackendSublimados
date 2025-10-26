const express = require('express');
const UsersService = require('../../services/organization/users.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { success } = require('../response');
const {
    createUserSchema,
    updateUserSchema,
    getUserSchema,
    queryUserSchema,
    updatePasswordSchema
} = require('../../schemas/organization/users.schema');

const router = express.Router();
const service = new UsersService();

router.get('/',
    validatorHandler(queryUserSchema, 'query'),
    async (req, res, next) => {
        try {
            const users = await service.find(req.query);
            success(res, users);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/roles',
    async (req, res, next) => {
        try {
            const roles = await service.findRoles();
            success(res, roles);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await service.findOne(id);
            success(res, user, 'Usuario encontrado con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const user = await service.create(body);
            success(res, user, 'Usuario creado con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id',
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const user = await service.update(id, body);
            success(res, user, 'Usuario actualizado con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id/change-password',
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updatePasswordSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const user = await service.updatePassword(id, body);
            success(res, user, 'Contraseña cambiada con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            success(res, id, 'Usuario eliminado con éxito');
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;