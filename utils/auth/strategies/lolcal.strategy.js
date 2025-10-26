const { Strategy } = require('passport-local');
const UsersService = require('../../../services/auth/auth.service');

const service = new UsersService();

const LocalStrategy = new Strategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    async (username, password, done) => {
        try {
          const user = await service.getUser(username, password);
          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
);

module.exports = LocalStrategy;