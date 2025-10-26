const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../../libs/sequelize');
const { firstToUpperCase } = require('../../utils/firstToUpperCase');

class EmployeesService {
    async find(query) {
        const { limit, offset, search, sortColumn, sortDirection } = query;

        const options = {
            order: [(sortColumn) ? [sortColumn, sortDirection] : ['id', 'DESC']]
        }
        const optionsCount = {};

        if (limit && offset) {
            options.limit = parseInt(limit);
            options.offset = parseInt(offset);
        }

        if (search) {
            options.where = {
                fullname: {
                    [Op.like]: `%${search}%`
                }
            }

            optionsCount.where = {
                fullname: {
                    [Op.like]: `%${search}%`
                }
            }
        }

        const employees = await models.Employee.findAll(options);
        const total = await models.Employee.count(optionsCount);

        return { employees, total };
    }

    async create(data) {
        const newData = {
            ...data,
            fullname: `${firstToUpperCase(data.name)} ${firstToUpperCase(data.firstLastname)} ${firstToUpperCase(data.secondLastname)}`
        }

        const employee = await models.Employee.create(newData);
        return employee;
    }

    async findOne(id) {
        const employee = await models.Employee.findByPk(id);
        if (!employee) {
            throw boom.notFound('No se encontro ningun empleado');
        }
        return employee;
    }

    async update(id, changes) {
        const newChanges = {
            ...changes,
            fullname: `${firstToUpperCase(changes.name)} ${firstToUpperCase(changes.firstLastname)} ${firstToUpperCase(changes.secondLastname)}`
        }

        let employees = await this.findOne(id);
        employees = await employees.update(newChanges);
        return employees;
    }

    async delete(id) {
        const employee = await this.findOne(id);
        await employee.destroy();
        return { id };
    }
}

module.exports = EmployeesService;