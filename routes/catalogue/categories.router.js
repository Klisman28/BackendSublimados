const express = require('express');
const CategoriesService = require('../../services/catalogue/categories.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { success } = require('../response');
const {
    createCategorySchema,
    getCategorySchema,
    queryCategorySchema
} = require('../../schemas/catalogue/categories.schema');

const router = express.Router();
const service = new CategoriesService();

router.get('/',
    validatorHandler(queryCategorySchema, 'query'),
    async (req, res, next) => {
        try {
            const categories = await service.find(req.query);
            success(res, categories);
        } catch (error) {
            next(error);
        }
    });

router.get('/:id',
    validatorHandler(getCategorySchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await service.findOne(id);
            success(res, category, 'Categoría encontrada con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createCategorySchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const category = await service.create(body);
            success(res, category, 'Categoría creada con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id',
    validatorHandler(getCategorySchema, 'params'),
    validatorHandler(createCategorySchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const category = await service.update(id, body);
            success(res, category, 'Categoría actualizada con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getCategorySchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            success(res, id, 'Categoría eliminada con éxito');
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;