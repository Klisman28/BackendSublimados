const { Model, DataTypes } = require('sequelize');
const SequelizeSlugify = require('sequelize-slugify');

const BRAND_TABLE = 'brands';

const BrandSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: true
    },
    code: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: true
    },
    slug: {
        type: DataTypes.STRING,
        unique: true
    }
}

class Brand extends Model {
    static associate() {
        // this.belongsTo(models.Category, {
        //     as: 'category'
        // });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: BRAND_TABLE,
            modelName: 'Brand',
            timestamps: false
        }
    }

    static slugify(models) {
        SequelizeSlugify.slugifyModel(models.Brand, {
            source: ['name']
        });
    }
}


module.exports = { BRAND_TABLE, BrandSchema, Brand }