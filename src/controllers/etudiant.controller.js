const etudiantService = require('../services/etudiant.service');
const ApiResponse = require('../utils/apiResponse');

class EtudiantController {
  async getAll(req, res, next) {
    try {
      const etudiants = await etudiantService.findAll();
      return ApiResponse.success(res, 'Liste des étudiants récupérée', etudiants);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const etudiant = await etudiantService.findById(req.params.id);
      return ApiResponse.success(res, 'Étudiant récupéré', etudiant);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const etudiant = await etudiantService.create(req.body);
      return ApiResponse.success(res, 'Étudiant créé avec succès', etudiant, 201);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const etudiant = await etudiantService.update(req.params.id, req.body);
      return ApiResponse.success(res, 'Étudiant mis à jour avec succès', etudiant);
    } catch (error) {
      next(error);
    }
  }

  async patch(req, res, next) {
    try {
      const etudiant = await etudiantService.patch(req.params.id, req.body);
      return ApiResponse.success(res, 'Étudiant modifié avec succès', etudiant);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await etudiantService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EtudiantController();
