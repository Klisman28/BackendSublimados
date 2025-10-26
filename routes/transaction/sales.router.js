const express = require('express');
const SalesService = require('../../services/transaction/sales.service');
const validatorHandler = require('../../middlewares/validator.handler');
const {
    createSaleSchema,
    getSaleSchema,
    querySaleSchema,
    updateSaleSchema,
    getSaleByOpeningSchema
} = require('../../schemas/transaction/sales.schema');
const { success } = require('../response');

const router = express.Router();
const service = new SalesService();

router.get('/',
    validatorHandler(querySaleSchema, 'query'),
    async (req, res, next) => {
        try {
            const sales = await service.find(req.query);
            success(res, sales);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getSaleSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const sale = await service.findOne(id);
            success(res, sale, 'Venta encontrada con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.get('/opening/:openingId',
    validatorHandler(getSaleByOpeningSchema, 'params'),
    async (req, res, next) => {
        try {
            const { openingId } = req.params;
            const sales = await service.findByOpening(openingId);
            success(res, sales);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createSaleSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const sale = await service.create(body);
            success(res, sale, 'Venta registrada con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id',
    validatorHandler(getSaleSchema, 'params'),
    validatorHandler(updateSaleSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const sale = await service.update(id, body);
            success(res, sale, 'Venta actualizada con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id',
    validatorHandler(getSaleSchema, 'params'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const sale = await service.returnSale(id);
        success(res, sale, 'Devolución realizada con éxito');
      } catch (error) {
        next(error);
      }
    }
  );

  
router.delete('/:id',
    validatorHandler(getSaleSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            success(res, id, 'Venta anulada con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;