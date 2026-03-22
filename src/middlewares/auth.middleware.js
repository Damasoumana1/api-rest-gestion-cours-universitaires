const jwt = require('jsonwebtoken');
const ApiResponse = require('../utils/apiResponse');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ApiResponse.error(res, 'Accès refusé. Aucun token valide fourni.', null, 401);
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return ApiResponse.error(res, 'Token invalide ou expiré.', null, 401);
  }
};

module.exports = authMiddleware;
