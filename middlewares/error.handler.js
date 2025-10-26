const { ValidationError } = require('sequelize');
const { error } = require('../routes/response');

function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    error(res, output.statusCode, output.payload.message, output.payload.error);
    return; // ✅ Detiene el flujo

  }
  next(err);
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    const errors = err.errors.map((item) => {
      return {
        type: item.type,
        message: item.message,
        path: item.path,
        value: item.value
      }
    });

    error(res, 409, err.name, errors);
    return; // ✅ Detiene el flujo

  }
  next(err);
}

function errorHandler(err, req, res, next) {
  error(res, 500, err.message, { stack: err.stack });
  return; // ✅ Detiene el flujo

}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }