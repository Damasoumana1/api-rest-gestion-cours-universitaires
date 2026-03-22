const etudiantRepository = require('../repositories/etudiant.repository');

class EtudiantService {
  async findAll() {
    return await etudiantRepository.findAll();
  }

  async findById(id) {
    const etudiant = await etudiantRepository.findById(id);
    if (!etudiant) {
      throw { status: 404, message: 'Étudiant non trouvé' };
    }
    return etudiant;
  }

  async create(data) {
    this.validate(data);
    return await etudiantRepository.save(data);
  }

  async update(id, data) {
    this.validate(data);
    const existing = await etudiantRepository.findById(id);
    if (!existing) {
      throw { status: 404, message: 'Étudiant non trouvé' };
    }
    return await etudiantRepository.update(id, data);
  }

  async patch(id, data) {
    const existing = await etudiantRepository.findById(id);
    if (!existing) {
      throw { status: 404, message: 'Étudiant non trouvé' };
    }
    return await etudiantRepository.patch(id, data);
  }

  async delete(id) {
    const existing = await etudiantRepository.findById(id);
    if (!existing) {
      throw { status: 404, message: 'Étudiant non trouvé' };
    }
    await etudiantRepository.delete(id);
    return true;
  }

  validate(etudiant) {
    if (!etudiant.nom || !etudiant.prenom || !etudiant.email || !etudiant.niveau) {
      throw { status: 400, message: 'Les champs nom, prenom, email et niveau sont obligatoires' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(etudiant.email)) {
      throw { status: 400, message: 'Format d\'email invalide' };
    }
  }
}

module.exports = new EtudiantService();
