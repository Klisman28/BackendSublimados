const Sequelize = require('sequelize');
const database = require('../config/database');
const setupModels = require('../database/models');

const USER = encodeURIComponent(database.dbUser);
const PASSWORD = encodeURIComponent(database.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${database.dbHost}:${database.dbPort}/${database.dbName}`

const sequelize = new Sequelize(URI, {
    dialect: 'mysql',
    host: '109.106.251.202',
    username: 'u530329005_react1',
    password: '#Klisman1234',
    database: 'u530329005_react1',
    dialectOptions: {
        ssl: {
        require: true,
        rejectUnauthorized: false, // Solo si el certificado es autofirmado
    },
},
    logging: (msg) => console.log('run db!!' + msg),
});

setupModels(sequelize);

module.exports = {
    sequelize,
    Sequelize,            
    models: sequelize.models,  
};