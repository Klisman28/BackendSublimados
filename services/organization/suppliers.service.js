const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../../libs/sequelize');

class SuppliersService {
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
                name: {
                    [Op.like]: `%${search}%`
                }
            }

            optionsCount.where = {
                name: {
                    [Op.like]: `%${search}%`
                }
            }
        }

        const suppliers = await models.Supplier.findAll(options);
        const total = await models.Supplier.count(optionsCount);

        return { suppliers, total };
    }

    async create(data) {
        const supplier = await models.Supplier.create(data);
        return supplier;
    }

    async findOne(id) {
        const supplier = await models.Supplier.findByPk(id);
        if (!supplier) {
            throw boom.notFound('No se encontro ningún proveedor');
        }
        return supplier;
    }

    async update(id, changes) {
        let suppliers = await this.findOne(id);
        suppliers = await suppliers.update(changes);
        return suppliers;
    }

    async delete(id) {
        const supplier = await this.findOne(id);
        await supplier.destroy();
        return { id };
    }
}

module.exports = SuppliersService;