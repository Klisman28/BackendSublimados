const express = require('express');
const PropertiesService = require('../../services/catalogue/properties.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { createPropertySchema, getPropertySchema, queryPropertySchema } = require('../../schemas/catalogue/properties.schema');

const router = express.Router();
const service = new PropertiesService();

router.get('/',
    validatorHandler(queryPropertySchema, 'query'),
    async (req, res, next) => {
        try {
            const query = req.query;
            const properties = await service.find(query);
            res.json(properties);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getPropertySchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const property = await service.findOne(id);
            res.json(property);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createPropertySchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const property = await service.create(body);
            res.status(201).json(property);
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id',
    validatorHandler(getPropertySchema, 'params'),
    validatorHandler(createPropertySchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const property = await service.update(id, body);
            res.status(201).json(property);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getPropertySchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.json({ id });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;