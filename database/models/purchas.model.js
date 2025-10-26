const { Model, DataTypes } = require('sequelize');
const { SUPPLIER_TABLE } = require('./supplier.model');
const { EMPPLOYEE_TABLE } = require('./employee.model');

const PURCHAS_TABLE = 'purchases';

const PurchasSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    supplierId: {
        field: 'supplier_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: SUPPLIER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    employeeId: {
        field: 'employee_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: EMPPLOYEE_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    dateIssue: {
        field: 'date_issue',
        allowNull: true,
        type: DataTypes.DATEONLY,
    },
    igv: {
        type: DataTypes.DECIMAL(8,2)
    },
    total: {
        allowNull: true,
        type: DataTypes.DECIMAL(8,2)
    }
}

class Purchas extends Model {
    static associate(models) {
        this.belongsTo(models.Supplier, {
            as: 'supplier'
        });

        this.belongsTo(models.Employee, {
            as: 'employee'
        });
        
        this.belongsToMany(models.Product, {
            as: 'products',
            through: models.ProductPurchas,
            foreignKey: 'purchasId',
            otherKey: 'productId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PURCHAS_TABLE,
            modelName: 'Purchas',
            timestamps: false
        }
    }
}

module.exports = { PURCHAS_TABLE, PurchasSchema, Purchas }