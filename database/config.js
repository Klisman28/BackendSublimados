require('dotenv').config();

// 1. Log de las variables crudas (antes de encodeURIComponent)
console.log('DB_USERNAME raw: ', process.env.DB_USERNAME);
console.log('DB_PASSWORD raw: ', process.env.DB_PASSWORD);
console.log('DB_HOST: ', process.env.DB_HOST);
console.log('DB_PORT: ', process.env.DB_PORT);
console.log('DB_NAME: ', process.env.DB_NAME);

// 2. Asignación y codificación
const USER = encodeURIComponent(process.env.DB_USERNAME || '');
const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD || ''); // Codificamos la contraseña
const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

// 3. Log de las variables ya codificadas
console.log('DB_USERNAME encoded: ', USER);
console.log('DB_PASSWORD encoded: ', PASSWORD);

// 4. Construcción y log de la URI final
const URI = `mysql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`;
console.log('Database URI: ', URI);

module.exports = {
  development: {
    url: URI,
    dialect: 'mysql',
    dialectOptions: {
      ssl: false
    }
  },
  production: {
    url: URI,
    dialect: 'mysql',
    dialectOptions: {
      ssl: false
    }
  }
};
