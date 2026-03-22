const authService = require('../services/auth.service');
const ApiResponse = require('../utils/apiResponse');

class AuthController {
  async register(req, res, next) {
    try {
      const user = await authService.register(req.body);
      return ApiResponse.success(res, 'Inscription réussie', user, 201);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      return ApiResponse.success(res, 'Connexion réussie', data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
