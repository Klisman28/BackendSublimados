const { Model, DataTypes } = require('sequelize');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: true,
        type: DataTypes.STRING,
        get() {
            const newValue = this.getDataValue('name');
            return newValue[0].toUpperCase() + newValue.slice(1);
        },
        set(value) {
            this.setDataValue('name', value.toLowerCase().trim());
        }
    },
    firstLastname: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'first_lastname',
        get() {
            const newValue = this.getDataValue('firstLastname');
            return newValue[0].toUpperCase() + newValue.slice(1);
        },
        set(value) {
            this.setDataValue('firstLastname', value.toLowerCase().trim());
        }
    },
    secondLastname: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'second_lastname',
        get() {
            const newValue = this.getDataValue('secondLastname');
            return newValue[0].toUpperCase() + newValue.slice(1);
        },
        set(value) {
            this.setDataValue('secondLastname', value.toLowerCase().trim());
        }
    },
    fullname: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    dni: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    telephone: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    }
}

class Customer extends Model {
    // static associate(models) {
    //     this.hasMany(models.Subcategory, {
    //         as: 'subcategories',
    //         foreignKey: 'categoryId'
    //     });
    // }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CUSTOMER_TABLE,
            modelName: 'Customer',
            timestamps: false
        }
    }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer }