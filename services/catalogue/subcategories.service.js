const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../../libs/sequelize');

class SubcategoriesService {
    async find(query) {
        const { limit, offset, search, sortColumn, sortDirection } = query;
        const options = {
            include: ['category'],
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

        const subcategories = await models.Subcategory.findAll(options);
        const total = await models.Subcategory.count(optionsCount);

        return { subcategories, total };
    }

    async create(data) {
        const subcategory = await models.Subcategory.create(data);

        // if (data.brands && data.brands.length > 0) {
        //     data.brands.forEach(async (id) => {
        //         const brand = await models.Brand.findByPk(id);
        //         await subcategory.addBrand(brand);
        //     });
        // }
        return subcategory;
    }

    async findOne(id) {
        const subcategory = await models.Subcategory.findByPk(id, {
            include: [
                // {
                //     model: models.Brand,
                //     as: 'brands',
                //     attributes: ['id', 'name'],
                //     through: {
                //         attributes: []
                //     }
                // },
                {
                    model: models.Category,
                    as: 'category',
                }
            ]
        });
        if (!subcategory) {
            throw boom.notFound('No se encontro ninguna subcategoria');
        }
        return subcategory;
    }

    async update(id, changes) {
        let subcategory = await this.findOne(id);
        
        subcategory = await subcategory.update(changes);
        // if (changes.brands) {
        //     await models.BrandSubcategory.destroy({
        //         where: {
        //             subcategoryId: id
        //         }
        //     });
        //     changes.brands.forEach(async (id) => {
        //         const brand = await models.Brand.findByPk(id)
        //         await subcategory.addBrand(brand);
        //     });
        // }
        return subcategory;
    }

    async delete(id) {
        const subcategory = await this.findOne(id);
        await subcategory.destroy();
        return { id };
    }
}

module.exports = SubcategoriesService;