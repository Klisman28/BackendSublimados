const express = require('express');
const EmployeesService = require('../../services/organization/employees.service');
const validatorHandler = require('../../middlewares/validator.handler');
const {
    createEmployeeSchema,
    getEmployeeSchema,
    queryEmployeeSchema
} = require('../../schemas/organization/employees.schema');
const { success } = require('../response');

const router = express.Router();
const service = new EmployeesService();

router.get('/',
    validatorHandler(queryEmployeeSchema, 'query'),
    async (req, res, next) => {
        try {
            const employees = await service.find(req.query);
            success(res, employees);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getEmployeeSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const employee = await service.findOne(id);
            success(res, employee, 'Empleado encontrado con éxito');
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createEmployeeSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const employee = await service.create(body);
            success(res, employee, 'Empleado registrado con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id',
    validatorHandler(getEmployeeSchema, 'params'),
    validatorHandler(createEmployeeSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const employee = await service.update(id, body);
            success(res, employee, 'Empleado actualizado con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getEmployeeSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            success(res, id, 'Empleado eliminado con éxito', 201);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;