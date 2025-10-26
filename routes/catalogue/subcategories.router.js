const express = require('express');
const SubcategoriesService = require('../../services/catalogue/subcategories.service');
const validatorHandler = require('../../middlewares/validator.handler');
const {
    createSubcategorySchema,
    getSubcategorySchema,
    querySubcategorySchema
} = require('../../schemas/catalogue/subcategories.schema');
const { success } = require('../response');

const router = express.Router();
const service = new SubcategoriesService();

router.get('/',
    validatorHandler(querySubcategorySchema, 'query'),
    async (req, res, next) => {
        try {
            const subcategories = await service.find(req.query);
            success(res, subcategories);
        } catch (error) {
            next(error);
        }
    });

router.get('/:id',
    validatorHandler(getSubcategorySchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const subcategory = await service.findOne(id);
            success(res, subcategory, 'Subcategoría encontrada con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createSubcategorySchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const subcategory = await service.create(body);
            success(res, subcategory, 'Subcategoría creada con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id',
    validatorHandler(getSubcategorySchema, 'params'),
    validatorHandler(createSubcategorySchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const subcategory = await service.update(id, body);
            success(res, subcategory, 'Subcategoría actualizada con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getSubcategorySchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            success(res, id, 'Subcategoría eliminada con éxito');
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;