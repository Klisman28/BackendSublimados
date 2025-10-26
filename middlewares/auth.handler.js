const boom = require('@hapi/boom');
const auth = require('../config/auth.config');


function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === auth.apiKey) {
      next();
  } else {
      next(boom.unauthorized('Inicie sesión'));
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
      const user = req.user;
      let hasRole = false;
      user.roles.forEach(role => {
          if (roles.includes(role)) {
              hasRole = true;
          }
      });
      if (hasRole) {
          next();
      } else {
          next(boom.forbidden('No tienes permisos suficientes'));
      }
  }
}


module.exports = { checkApiKey, checkRoles };
