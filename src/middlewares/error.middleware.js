const ApiResponse = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Erreur interne du serveur';
  
  // Log l'erreur pour le débogage systémique
  if (statusCode === 500) {
    console.error('System Error:', err);
  }

  return ApiResponse.error(res, message, null, statusCode);
};

module.exports = errorHandler;
