const coursService = require('../services/cours.service');
const ApiResponse = require('../utils/apiResponse');

class CoursController {
  async getAllCours(req, res, next) {
    try {
      const cours = await coursService.findAll();
      return ApiResponse.success(res, 'Liste des cours récupérée', cours);
    } catch (error) {
      next(error);
    }
  }

  async getCoursById(req, res, next) {
    try {
      const { id } = req.params;
      const cours = await coursService.findById(id);
      return ApiResponse.success(res, 'Cours récupéré', cours);
    } catch (error) {
      next(error);
    }
  }

  async createCours(req, res, next) {
    try {
      const cours = await coursService.create(req.body);
      return ApiResponse.success(res, 'Cours créé avec succès', cours, 201);
    } catch (error) {
      next(error);
    }
  }

  async updateCours(req, res, next) {
    try {
      const { id } = req.params;
      const cours = await coursService.update(id, req.body);
      return ApiResponse.success(res, 'Cours mis à jour avec succès', cours);
    } catch (error) {
      next(error);
    }
  }

  async patchCours(req, res, next) {
    try {
      const { id } = req.params;
      const cours = await coursService.patch(id, req.body);
      return ApiResponse.success(res, 'Cours modifié partiellement avec succès', cours);
    } catch (error) {
      next(error);
    }
  }

  async deleteCours(req, res, next) {
    try {
      const { id } = req.params;
      await coursService.delete(id);
      return res.status(204).send(); // 204 No Content
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CoursController();
