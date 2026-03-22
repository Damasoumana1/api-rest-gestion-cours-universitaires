// Ce middleware sert d'exemple pour montrer où la validation des requêtes pourrait se faire.
// Actuellement gérée dans le service pour la simplicité.

const validationMiddleware = (req, res, next) => {
  // Option: ajouter Joi ou express-validator ici
  next();
};

module.exports = validationMiddleware;
