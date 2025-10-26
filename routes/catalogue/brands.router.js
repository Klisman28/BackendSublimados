const express = require('express');
const BrandsService = require('../../services/catalogue/brands.service');
const { success } = require('../response');
const validatorHandler = require('../../middlewares/validator.handler');
const {
    createBrandSchema,
    getBrandSchema,
    queryBrandSchema
} = require('../../schemas/catalogue/brands.schema');

const router = express.Router();
const service = new BrandsService();

router.get('/',
    validatorHandler(queryBrandSchema, 'query'),
    async (req, res, next) => {
        try {
            const brands = await service.find(req.query);
            success(res, brands);
        } catch (error) {
            next(error);
        }
    });

router.get('/:id',
    validatorHandler(getBrandSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const brand = await service.findOne(id);
            success(res, brand, 'Marca encontrada con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createBrandSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const brand = await service.create(body);
            success(res, brand, 'Marca registrada con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id',
    validatorHandler(getBrandSchema, 'params'),
    validatorHandler(createBrandSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const brand = await service.update(id, body);
            success(res, brand, 'Marca actualizada con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getBrandSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            success(res, id, 'Marca eliminada con éxito');
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;