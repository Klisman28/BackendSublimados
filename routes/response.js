exports.success = function (res, data, message = 'La solicitud ha tenido éxito', status = 200) {
  if (res.headersSent) return;
  res.status(status).json({
    type: 'success',
    message,
    data,
  });
};

exports.error = function (res, status, message, error) {
  if (res.headersSent) return;
  let statusCode = status || 500;
  res.status(statusCode).json({
    type: 'error',
    message,
    error,
  });
};
