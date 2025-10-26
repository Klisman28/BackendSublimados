const { Op } = require('sequelize');
const { models } = require('../../libs/sequelize');

class FeaturesServices {
    async find(query) {
        const features = await models.Feature.findAll({
            include: ['option'],
            where: {
                productId: {
                    [Op.eq]: parseInt(query.productId)
                }
            }
        });

        return features;
    }
}

module.exports = FeaturesServices;