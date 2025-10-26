const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../../libs/sequelize');

class CashiersService {
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

        const cashiers = await models.Cashier.findAll(options);
        const total = await models.Cashier.count(optionsCount);

        return { cashiers, total };
    }

    async create(data) {
        const cashier = await models.Cashier.create(data);
        return cashier;
    }

    async findOne(id) {
        const cashier = await models.Cashier.findByPk(id);
        if (!cashier) {
            throw boom.notFound('No se encontró ninguna caja');
        }
        return cashier;
    }

    async findByStatus() {
        const cashiers = await models.Cashier.findAll({
            where: {
                status: 0
            }
        });
        if (!cashiers) {
            throw boom.notFound('No se encontró ninguna caja disponible');
        }
        return cashiers;
    }

    async update(id, changes) {
        let cashier = await this.findOne(id);
        cashier = await cashier.update(changes);
        return cashier;
    }

    async delete(id) {
        const cashier = await this.findOne(id);
        await cashier.destroy();
        return { id };
    }
}

module.exports = CashiersService;