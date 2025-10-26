const { Model, DataTypes } = require('sequelize');
const SequelizeSlugify = require('sequelize-slugify');
const { CATEGORY_TABLE } = require('./category.model');

const SUBCATEGORY_TABLE = 'subcategories';

const SubcategorySchema = {
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
    // status: {
    //     type: DataTypes.INTEGER,
    //     defaultValue: 1,
    //     get() {
    //         const value = this.getDataValue('status');
    //         let statusText = '';
    //         if (value === 1) {
    //             statusText = 'Activo';
    //         } else if (value === 2) {
    //             statusText = 'Inactivo'
    //         }
    //         return statusText;
    //     }
    // },
    slug: {
        type: DataTypes.STRING,
        unique: true
    },
    // imageUrl: {
    //     allowNull: true,
    //     type: DataTypes.STRING,
    //     field: 'image_url'
    // },
    categoryId: {
        field: 'category_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: CATEGORY_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}

class Subcategory extends Model {
    static associate(models) {
        this.belongsTo(models.Category, {
            as: 'category'
        });
        
        this.belongsToMany(models.Brand, {
            as: 'brands',
            through: models.BrandSubcategory,
            foreignKey: 'subcategoryId',
            otherKey: 'brandId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SUBCATEGORY_TABLE,
            modelName: 'Subcategory',
            timestamps: false
        }
    }

    static slugify(models) {
        SequelizeSlugify.slugifyModel(models.Subcategory, {
            source: ['name']
        });
    }
}


module.exports = { SUBCATEGORY_TABLE, SubcategorySchema, Subcategory }