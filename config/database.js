require('dotenv').config();

const database = {
  dbUser:  process.env.DB_USERNAME,
  dbPassword:  process.env.DB_PASSWORD,
  dbHost:  process.env.DB_HOST,
  dbName:  process.env.DB_NAME,
  dbPort:  process.env.DB_PORT,
}

module.exports = database;