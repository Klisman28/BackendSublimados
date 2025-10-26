const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../../libs/sequelize');

class CategoriesService {
    async find(query) {
        const { limit, offset, search, sortColumn, sortDirection } = query;

        const options = {
            // include: {
            //     model: models.Subcategory,
            //     as: 'subcategories',
            //     attributes: ['id']
            // },
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

        const categories = await models.Category.findAll(options);
        const total = await models.Category.count(optionsCount);

        return { categories, total };
    }

    async create(data) {
        const category = await models.Category.create(data);
        return category;
    }

    async findOne(id) {
        const category = await models.Category.findByPk(id);
        if (!category) {
            throw boom.notFound('No se encontro ninguna categoria');
        }
        return category;
    }

    async update(id, changes) {
        let category = await this.findOne(id);
        category = await category.update(changes);
        return category;
    }

    async delete(id) {
        const category = await this.findOne(id);
        await category.destroy();
        return { id };
    }
}

module.exports = CategoriesService;