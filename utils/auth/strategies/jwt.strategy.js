const { Strategy, ExtractJwt} = require('passport-jwt');
const auth = require('../../../config/auth.config');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: auth.jwtSecret
}

const JwtStrategy = new Strategy(options, (payload, done) => {
    return done(null, payload);
});

module.exports = JwtStrategy;