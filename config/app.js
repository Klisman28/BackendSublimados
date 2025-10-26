require('dotenv').config();

const app = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
}

module.exports = app;