const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../../libs/sequelize');

class PropertiesService {
    async find(query) {
        const options = {
            order: [['id', 'ASC']],
            where: {
                subcategoryId: {
                    [Op.eq]: parseInt(query.subcategoryId)
                }
            },
            include: ['options']
        }
        const properties = await models.Property.findAll(options);

        return properties;
    }

    async create(data) {
        const property = await models.Property.create(data);

        if (data.searchable && data.options && data.options.length > 0) {
            const options = data.options.map((option) => {
                return {
                    ...option,
                    propertyId: property.id
                }
            });
            await models.Option.bulkCreate(options);
        }

        return property;
    }

    async findOne(id) {
        const property = await models.Property.findByPk(id, {
            include: ['options']
        });
        if (!property) {
            throw boom.notFound('No se encontro ninguna propiedad');
        }
        return property;
    }

    async update(id, changes) {
        let property = await this.findOne(id);

        property = await property.update(changes);
        await models.Option.destroy({
            where: {
                propertyId: id
            }
        });
        if (changes.searchable && changes.options && changes.options.length > 0) {
            const options = changes.options.map((option) => {
                return {
                    ...option,
                    propertyId: property.id
                }
            });
            await models.Option.bulkCreate(options);
        }
        return property;
    }

    async delete(id) {
        await models.Option.destroy({
            where: {
                propertyId: id
            }
        });
        const property = await this.findOne(id);
        await property.destroy();
        return { id };
    }
}

module.exports = PropertiesService;