const express = require('express');
const ConfigsService = require('../../services/transaction/configs.service');
const validatorHandler = require('../../middlewares/validator.handler');
const {
    createConfigSchema,
    getConfigSchema,
} = require('../../schemas/transaction/configs.schema');
const { success } = require('../response');

const router = express.Router();
const service = new ConfigsService();

router.get('/',
    async (req, res, next) => {
        try {
            const config = await service.findFirst();
            success(res, config, 'Configuración encontrado con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createConfigSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const config = await service.create(body);
            success(res, config, 'Configuración registrado con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getConfigSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const config = await service.findOne(id);
            success(res, config, 'Configuración encontrado con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id',
    validatorHandler(getConfigSchema, 'params'),
    validatorHandler(createConfigSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const config = await service.update(id, body);
            success(res, config, 'Configuración actualizado con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getConfigSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            success(res, id, 'Cajero eliminado con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;