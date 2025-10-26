const express = require('express');
const EnterprisesService = require('../../services/client/enterprises.service');
const validatorHandler = require('../../middlewares/validator.handler');
const {
    createEnterpriseSchema,
    getEnterpriseSchema,
    queryEnterpriseSchema
} = require('../../schemas/client/enterprises.schema');
const { success } = require('../response');

const router = express.Router();
const service = new EnterprisesService();

router.get('/',
    validatorHandler(queryEnterpriseSchema, 'query'),
    async (req, res, next) => {
        try {
            const enterprises = await service.find(req.query);
            success(res, enterprises);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getEnterpriseSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const enterprise = await service.findOne(id);
            success(res, enterprise, 'Empresa encontrada con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createEnterpriseSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const enterprise = await service.create(body);
            success(res, enterprise, 'Empresa registrada con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id',
    validatorHandler(getEnterpriseSchema, 'params'),
    validatorHandler(createEnterpriseSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const enterprise = await service.update(id, body);
            success(res, enterprise, 'Empresa actualizada con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getEnterpriseSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            success(res, id, 'Empresa eliminada con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;