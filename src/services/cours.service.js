const coursRepository = require('../repositories/cours.repository');

// Mapping des chemins RFC 6902 vers les noms de champs internes
const ALLOWED_PATHS = {
  '/titre': 'titre',
  '/enseignant': 'enseignant',
  '/volumeHoraire': 'volumeHoraire',
  '/actif': 'actif'
};

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
    const existing = await coursRepository.findById(id);
    if (!existing) {
      throw { status: 404, message: 'Cours non trouvé' };
    }
    return await coursRepository.update(id, data);
  }

  /**
   * PATCH conforme RFC 6902 (JSON Patch)
   * Body attendu : [{ "op": "replace", "path": "/volumeHoraire", "value": 40 }]
   */
  async patch(id, operations) {
    // Vérifier que le body est bien un tableau d'opérations
    if (!Array.isArray(operations) || operations.length === 0) {
      throw { status: 400, message: 'Le corps doit être un tableau d\'opérations JSON Patch (RFC 6902)' };
    }

    const existing = await coursRepository.findById(id);
    if (!existing) {
      throw { status: 404, message: 'Cours non trouvé' };
    }

    // Convertir les opérations RFC 6902 en un objet de données simple
    const data = {};
    for (const op of operations) {
      if (op.op !== 'replace') {
        throw { status: 400, message: `Opération "${op.op}" non supportée. Seule "replace" est autorisée.` };
      }
      if (!ALLOWED_PATHS[op.path]) {
        throw { status: 400, message: `Chemin "${op.path}" non reconnu. Chemins valides : /titre, /enseignant, /volumeHoraire, /actif` };
      }
      data[ALLOWED_PATHS[op.path]] = op.value;
    }

    // Validation métier sur les champs modifiés
    if (data.volumeHoraire !== undefined && data.volumeHoraire <= 0) {
      throw { status: 400, message: 'Le volume horaire doit être supérieur à 0' };
    }

    const result = await coursRepository.patch(id, data);
    if (result === null) {
      throw { status: 400, message: 'Aucun champ valide fourni pour la mise à jour' };
    }
    return result;
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
