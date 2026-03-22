const coursRepository = require('../repositories/cours.repository');

class CoursService {
  async findAll() {
    return await coursRepository.findAll();
  }

  async findById(id) {
    const cours = await coursRepository.findById(id);
    if (!cours) {
      throw { status: 404, message: 'Cours non trouvé' };
    }
    return cours;
  }

  async create(data) {
    this.validate(data);
    return await coursRepository.save(data);
  }

  async update(id, data) {
    this.validate(data);
    
    // Vérifier si le cours existe
    const existing = await coursRepository.findById(id);
    if (!existing) {
      throw { status: 404, message: 'Cours non trouvé' };
    }

    return await coursRepository.update(id, data);
  }

  async patch(id, data) {
    // Validation partielle si on modifie le volumeHoraire
    if (data.volumeHoraire !== undefined && data.volumeHoraire <= 0) {
      throw { status: 400, message: 'Le volume horaire doit être supérieur à 0' };
    }

    const existing = await coursRepository.findById(id);
    if (!existing) {
      throw { status: 404, message: 'Cours non trouvé' };
    }

    return await coursRepository.patch(id, data);
  }

  async delete(id) {
    const existing = await coursRepository.findById(id);
    if (!existing) {
      throw { status: 404, message: 'Cours non trouvé' };
    }

    await coursRepository.delete(id);
    return true;
  }

  validate(cours) {
    if (!cours.titre || !cours.enseignant || cours.volumeHoraire === undefined) {
      throw { status: 400, message: 'Le titre, l\'enseignant et le volume horaire sont obligatoires' };
    }
    if (cours.volumeHoraire <= 0) {
      throw { status: 400, message: 'Le volume horaire doit être supérieur à 0' };
    }
  }
}

module.exports = new CoursService();
