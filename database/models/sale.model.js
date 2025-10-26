const { Model, DataTypes } = require('sequelize');
const { OPENING_TABLE } = require('./opening.model');

const SALE_TABLE = 'sales';

const SaleSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    serie: {
        type: DataTypes.STRING,
    },
    number: {
        allowNull: true,
        type: DataTypes.STRING
    },
    dateIssue: {
        field: 'date_issue',
        allowNull: true,
        type: DataTypes.DATEONLY,
    },
    status: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    saleableId: {
        type: DataTypes.INTEGER,
        field: 'saleable_id'
    },
    saleableType: {
        type: DataTypes.STRING,
        field: 'saleable_type'
    },
    openingId: {
        field: 'opening_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: OPENING_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    type: {
        allowNull: true,
        type: DataTypes.STRING
    },
    igv: {
        type: DataTypes.DECIMAL(8, 2)
    },
    total: {
        allowNull: true,
        type: DataTypes.DECIMAL(8, 2)
    }
}

const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;

class Sale extends Model {
    static associate(models) {
        this.belongsToMany(models.Product, {
            as: 'products',
            through: models.ProductSale,
            foreignKey: 'saleId',
            otherKey: 'productId'
        });

        this.belongsTo(models.Opening, {
            as: 'opening'
        });

        this.belongsTo(models.Customer, {
            as: 'customer',
            foreignKey: "saleableId",
            constraints: false,
        });

        this.belongsTo(models.Enterprise, {
            as: 'enterprise',
            foreignKey: "saleableId",
            constraints: false
        });

        // this.addHook("afterFind", findResult => {
        //     if (!Array.isArray(findResult)) findResult = [findResult];
        //     for (const instance of findResult) {
        //         if (instance.saleableType === "customers" && instance.customers !== undefined) {
        //             instance.saleable = instance.customers;
        //         } else if (instance.saleableType === "enterprises" && instance.enterprises !== undefined) {
        //             instance.saleable = instance.enterprises;
        //         }
        //         // To prevent mistakes:
        //         delete instance.customers;
        //         delete instance.dataValues.customers;
        //         delete instance.enterprises;
        //         delete instance.dataValues.enterprises;
        //     }
        // });
    }

    // static getSaleable(options) {
    //     if (!this.saleableType) return Promise.resolve(null);
    //     const mixinMethodName = `get${uppercaseFirst(this.saleableType)}`;
    //     return this[mixinMethodName](options);
    // }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SALE_TABLE,
            modelName: 'Sale',
            timestamps: false
        }
    }
}


module.exports = { SALE_TABLE, SaleSchema, Sale }