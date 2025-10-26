const express = require('express');
const CashiersService = require('../../services/transaction/cashiers.service');
const validatorHandler = require('../../middlewares/validator.handler');
const {
    createCashierSchema,
    getCashierSchema,
    queryCashierSchema
} = require('../../schemas/transaction/cashiers.schema');
const { success } = require('../response');

const router = express.Router();
const service = new CashiersService();

router.get('/',
    validatorHandler(queryCashierSchema, 'query'),
    async (req, res, next) => {
        try {
            const cashiers = await service.find(req.query);
            success(res, cashiers);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/available',
    async (req, res, next) => {
        try {
            const cashiers = await service.findByStatus();
            success(res, cashiers);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getCashierSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const cashier = await service.findOne(id);
            success(res, cashier, 'Cajero encontrado con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createCashierSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const cashier = await service.create(body);
            success(res, cashier, 'Cajero registrado con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id',
    validatorHandler(getCashierSchema, 'params'),
    validatorHandler(createCashierSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const cashier = await service.update(id, body);
            success(res, cashier, 'Cajero actualizado con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getCashierSchema, 'params'),
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