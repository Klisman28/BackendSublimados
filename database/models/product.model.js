const { Model, DataTypes } = require('sequelize');
const SequelizeSlugify = require('sequelize-slugify');
const { BRAND_TABLE } = require('./brand.model');
const { SUBCATEGORY_TABLE } = require('./subcategory.model');
const { UNIT_TABLE } = require('./unit.model');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    sku: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: true
    },
    name: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: true
    },
    slug: {
        type: DataTypes.STRING,
        unique: true
    },
    cost: {
        type: DataTypes.DECIMAL(8,2),
        allowNull: true
    },
    utility: {
        type: DataTypes.DECIMAL(8,2),
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(8,2),
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    stockMin: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'stock_min'
    },
    imageUrl: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'image_url'
    },
    expirationDate: {
        allowNull: true,
        type: DataTypes.DATEONLY,
        field: 'expirationDate'
      },
    hasExpiration: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
     description: { 
        type: DataTypes.TEXT,  
        allowNull: true,  
    },
    brandId: {
        field: 'brand_id',
        allowNull: false,
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
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: SUBCATEGORY_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    unitId: {
        field: 'unit_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: UNIT_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },

    //descomentar despues de correr las migraciones
    // status: {
    //     type: DataTypes.VIRTUAL,
    //     get() {
    //         const stock = this.stock;
    //         const stockMin = this.stockMin;
    //         let status = 0;

    //         if(stock == 0){
    //             status = 2;
    //         } else if (stock <= stockMin) {
    //             status = 1;
    //         }

    //         return status;
    //       },
    // }
}

class Product extends Model {
    static associate(models) {
        this.belongsTo(models.Brand, {
            as: 'brand'
        });
        this.belongsTo(models.Subcategory, {
            as: 'subcategory'
        });
        this.belongsTo(models.Unit, {
            as: 'unit'
        });
        // this.hasMany(models.Feature, {
        //     as: 'features',
        //     foreignKey: 'productId'
        // });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PRODUCT_TABLE,
            modelName: 'Product',
            timestamps: false
        }
    }

    static slugify(models) {
        SequelizeSlugify.slugifyModel(models.Product, {
            source: ['name']
        });
    }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product }