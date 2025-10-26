require('dotenv').config();

const auth = {
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET
}

module.exports = auth;