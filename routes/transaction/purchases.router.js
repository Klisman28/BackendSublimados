const express = require('express');
const PurchasesService = require('../../services/transaction/purchases.service');
const validatorHandler = require('../../middlewares/validator.handler');
const {
    createPurchasSchema,
    getPurchasSchema,
    queryPurchasSchema
} = require('../../schemas/transaction/purchases.schema');
const { success } = require('../response');

const router = express.Router();
const service = new PurchasesService();

router.get('/',
    validatorHandler(queryPurchasSchema, 'query'),
    async (req, res, next) => {
        try {
            const purchases = await service.find(req.query);
            success(res, purchases);
        } catch (error) {
            next(error);
        }
    });

router.get('/:id',
    validatorHandler(getPurchasSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const purchas = await service.findOne(id);
            success(res, purchas, 'Compra encontrada con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createPurchasSchema, 'body'),
    async (req, res, next) => {
        try {
            const { sub } = req.user
            const body = req.body;
            const purchas = await service.create(body, sub);
            success(res, purchas, 'Compra registrada con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id',
    validatorHandler(getPurchasSchema, 'params'),
    validatorHandler(createPurchasSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const purchas = await service.update(id, body);
            success(res, purchas, 'Compra actualizada con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getPurchasSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            success(res, id, 'Compra anulada con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;