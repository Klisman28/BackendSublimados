const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class ConfigsService {

    async findFirst() {
        const config = await models.Config.findOne();
        if (!config) {
            throw boom.notFound('No se encontró ninguna configuración');
        }
        return config;
    }

    async create(data) {
        const config = await models.Config.create(data);
        return config;
    }

    async findOne(id) {
        const config = await models.Config.findByPk(id);
        if (!config) {
            throw boom.notFound('No se encontró ninguna configuración');
        }
        return config;
    }

    async update(id, changes) {
        let config = await this.findOne(id); 
        config = await config.update(changes); 
        return config;
    }

    async delete(id) {
        const config = await this.findOne(id);
        await config.destroy();
        return { id };
    }
}

module.exports = ConfigsService;