const { Model, DataTypes } = require('sequelize');

const { BRAND_TABLE } = require('./brand.model');
const { SUBCATEGORY_TABLE } = require('./subcategory.model');
const BRAND_SUBCATEGORY_TABLE = 'brands_subcategories';

const BrandSubcategorySchema = {
    brandId: {
        field: 'brand_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: BRAND_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    subcategoryId: {
        field: 'subcategory_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: SUBCATEGORY_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}

class BrandSubcategory extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: BRAND_SUBCATEGORY_TABLE,
            modelName: 'BrandSubcategory',
            timestamps: false
        }
    }
}

module.exports = { BRAND_SUBCATEGORY_TABLE, BrandSubcategorySchema, BrandSubcategory };