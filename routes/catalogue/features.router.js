const express = require('express');
const FeaturesServices = require('../../services/catalogue/features.services');
const validatorHandler = require('../../middlewares/validator.handler');
const { queryFeatureSchema } = require('../../schemas/catalogue/features.schema');

const router = express.Router();
const service = new FeaturesServices();

router.get('/',
    validatorHandler(queryFeatureSchema, 'query'),
    async (req, res, next) => {
        try {
            const query = req.query;
            const features = await service.find(query);
            res.json(features);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;