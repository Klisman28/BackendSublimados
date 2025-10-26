const { Model, DataTypes } = require('sequelize');

const EMPPLOYEE_TABLE = 'employees';

const EmployeeSchema = {
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
        unique: true,
    },
    birthdate: {
        type: DataTypes.DATEONLY,
    },
    gender: {
        type: DataTypes.STRING,
        get() {
            const newValue = this.getDataValue('gender');
            return newValue[0].toUpperCase() + newValue.slice(1);
        },
        set(value) {
            this.setDataValue('gender', value.toLowerCase().trim());
        }
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

class Employee extends Model {
    // static associate(models) {
    //     this.hasMany(models.Subcategory, {
    //         as: 'subcategories',
    //         foreignKey: 'categoryId'
    //     });
    // }
    static associate(models) {
        // hasOne polimórfico (se suele hacer constraints: false):
        this.hasOne(models.User, {
          as: 'user',
          foreignKey: 'userableId',
          constraints: false
        });
      }

    static config(sequelize) {
        return {
            sequelize,
            tableName: EMPPLOYEE_TABLE,
            modelName: 'Employee',
            timestamps: false
        }
    }
}

module.exports = { EMPPLOYEE_TABLE, EmployeeSchema, Employee }