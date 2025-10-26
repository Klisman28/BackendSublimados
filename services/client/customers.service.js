const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../../libs/sequelize');
const { firstToUpperCase } = require('../../utils/firstToUpperCase');

class CustomersService {
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

        const customers = await models.Customer.findAll(options);
        const total = await models.Customer.count(optionsCount);

        return { customers, total };
    }

    async create(data) {
        const newData = {
            ...data,
            fullname: `${firstToUpperCase(data.name)} ${firstToUpperCase(data.firstLastname)} ${firstToUpperCase(data.secondLastname)}`
        }

        const customer = await models.Customer.create(newData);
        return customer;
    }

    async findOne(id) {
        const customer = await models.Customer.findByPk(id);
        if (!customer) {
            throw boom.notFound('No se encontro ningun cliente');
        }
        return customer;
    }

    async update(id, changes) {
        const newChanges = {
            ...changes,
            fullname: `${firstToUpperCase(changes.name)} ${firstToUpperCase(changes.firstLastname)} ${firstToUpperCase(changes.secondLastname)}`
        }

        let customers = await this.findOne(id);
        customers = await customers.update(newChanges);
        return customers;
    }

    async delete(id) {
        const customer = await this.findOne(id);
        await customer.destroy();
        return { id };
    }
}

module.exports = CustomersService;