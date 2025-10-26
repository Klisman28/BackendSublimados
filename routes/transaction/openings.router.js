const express = require('express');
const OpeningsService = require('../../services/transaction/openings.service');
const validatorHandler = require('../../middlewares/validator.handler');
const {
    createOpeningSchema,
    getOpeningSchema,
    queryOpeningSchema,
    updateOpeningSchema
} = require('../../schemas/transaction/openings.schema');
const { success } = require('../response');

const router = express.Router();
const service = new OpeningsService();

router.get('/',
    validatorHandler(queryOpeningSchema, 'query'),
    async (req, res, next) => {
        try {
            const openings = await service.find(req.query);
            success(res, openings);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/current',
    async (req, res, next) => {
        try {
            const { sub } = req.user
            const opening = await service.findByEmployee(sub);
            success(res, opening, 'Apertura encontrada con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getOpeningSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const opening = await service.findOne(id);
            success(res, opening, 'Apertura encontrada con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createOpeningSchema, 'body'),
    async (req, res, next) => {
        try {
            const { sub } = req.user
            const body = req.body;
            const opening = await service.create(body, sub);
            success(res, opening, 'Apertura registrada con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id',
    validatorHandler(getOpeningSchema, 'params'),
    validatorHandler(updateOpeningSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            console.log(req.params);
            
            const body = req.body;
            const opening = await service.update(id, body);
            success(res, opening, 'Apertura actualizada con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getOpeningSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            success(res, id, 'Apertura eliminada con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;