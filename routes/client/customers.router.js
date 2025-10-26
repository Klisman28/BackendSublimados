const express = require('express');
const CustomersService = require('../../services/client/customers.service');
const validatorHandler = require('../../middlewares/validator.handler');
const {
    createCustomerSchema,
    getCustomerSchema,
    queryCustomerSchema
} = require('../../schemas/client/customers.schema');
const { success } = require('../response');

const router = express.Router();
const service = new CustomersService();

router.get('/',
    validatorHandler(queryCustomerSchema, 'query'),
    async (req, res, next) => {
        try {
            const customers = await service.find(req.query);
            success(res, customers);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getCustomerSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const customer = await service.findOne(id);
            success(res, customer, 'Cliente encontrado con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createCustomerSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const customer = await service.create(body);
            success(res, customer, 'Cliente registrado con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id',
    validatorHandler(getCustomerSchema, 'params'),
    validatorHandler(createCustomerSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const customer = await service.update(id, body);
            success(res, customer, 'Cliente actualizado con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getCustomerSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            success(res, id, 'Cliente eliminado con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;