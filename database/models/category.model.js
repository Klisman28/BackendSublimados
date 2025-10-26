const { Model, DataTypes } = require('sequelize');
const SequelizeSlugify = require('sequelize-slugify');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: true,
        get() {
            const newValue = this.getDataValue('name');
            return newValue[0].toUpperCase() + newValue.slice(1);
        },
        set(value) {
            this.setDataValue('name', value.toLowerCase().trim());
        }
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

class Category extends Model {
    static associate(models) {
        this.hasMany(models.Subcategory, {
            as: 'subcategories',
            foreignKey: 'categoryId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category',
            timestamps: false
        }
    }

    static slugify(models) {
        SequelizeSlugify.slugifyModel(models.Category, {
            source: ['name']
        });
    }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category }