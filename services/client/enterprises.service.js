const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../../libs/sequelize');

class EnterprisesService {
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

        const enterprises = await models.Enterprise.findAll(options);
        const total = await models.Enterprise.count(optionsCount);

        return { enterprises, total };
    }

    async create(data) {
        const enterprise = await models.Enterprise.create(data);
        return enterprise;
    }

    async findOne(id) {
        const enterprise = await models.Enterprise.findByPk(id);
        if (!enterprise) {
            throw boom.notFound('No se encontro ninguna empresa');
        }
        return enterprise;
    }

    async update(id, changes) {
        let enterprises = await this.findOne(id);
        enterprises = await enterprises.update(changes);
        return enterprises;
    }

    async delete(id) {
        const enterprise = await this.findOne(id);
        await enterprise.destroy();
        return { id };
    }
}

module.exports = EnterprisesService;