const express = require('express');
const SuppliersService = require('../../services/organization/suppliers.service');
const validatorHandler = require('../../middlewares/validator.handler');
const {
    createSupplierSchema,
    getSupplierSchema,
    querySupplierSchema
} = require('../../schemas/organization/suppliers.schema');
const { success } = require('../response');

const router = express.Router();
const service = new SuppliersService();

router.get('/',
    validatorHandler(querySupplierSchema, 'query'),
    async (req, res, next) => {
        try {
            const suppliers = await service.find(req.query);
            success(res, suppliers);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getSupplierSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const supplier = await service.findOne(id);
            success(res, supplier, 'Proveedor encontrado con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createSupplierSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const supplier = await service.create(body);
            success(res, supplier, 'Proveedor registrado con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id',
    validatorHandler(getSupplierSchema, 'params'),
    validatorHandler(createSupplierSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const supplier = await service.update(id, body);
            success(res, supplier, 'Proveedor actualizado con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getSupplierSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            success(res, id, 'Proveedor eliminado con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;