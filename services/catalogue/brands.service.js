const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../../libs/sequelize');

class BrandsService {
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

        const brands = await models.Brand.findAll(options);
        const total = await models.Brand.count(optionsCount);

        return { brands, total };
    }

    async create(data) {
        const brand = await models.Brand.create(data);
        return brand;
    }

    async findOne(id) {
        const brand = await models.Brand.findByPk(id);
        if (!brand) {
            throw boom.notFound('No se encontro ninguna marca');
        }
        return brand;
    }

    async update(id, changes) {
        let brand = await this.findOne(id);
        brand = await brand.update(changes);
        return brand;
    }

    async delete(id) {
        const brand = await this.findOne(id);
        await brand.destroy();
        return { id };
    }
}

module.exports = BrandsService;