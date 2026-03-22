const db = require('../config/db');

class CoursRepository {
  async findAll() {
    const result = await db.query('SELECT * FROM cours ORDER BY id ASC');
    return result.rows;
  }

  async findById(id) {
    const result = await db.query('SELECT * FROM cours WHERE id = $1', [id]);
    return result.rows[0];
  }

  async save(cours) {
    const { titre, enseignant, volumeHoraire, actif } = cours;
    const result = await db.query(
      `INSERT INTO cours (titre, enseignant, volume_horaire, actif) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [titre, enseignant, volumeHoraire, actif]
    );
    return result.rows[0];
  }

  async update(id, cours) {
    const { titre, enseignant, volumeHoraire, actif } = cours;
    const result = await db.query(
      `UPDATE cours 
       SET titre = $1, enseignant = $2, volume_horaire = $3, actif = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5 RETURNING *`,
      [titre, enseignant, volumeHoraire, actif, id]
    );
    return result.rows[0];
  }

  async patch(id, data) {
    const fields = [];
    const values = [];
    let queryIdx = 1;

    const dbFields = {
      titre: 'titre',
      enseignant: 'enseignant',
      volumeHoraire: 'volume_horaire',
      actif: 'actif'
    };

    for (const [key, value] of Object.entries(data)) {
      if (dbFields[key] !== undefined) {
        fields.push(`${dbFields[key]} = $${queryIdx}`);
        values.push(value);
        queryIdx++;
      }
    }

    if (fields.length === 0) return null;

    values.push(id);
    const query = `UPDATE cours SET ${fields.join(', ')} WHERE id = $${queryIdx} RETURNING *`;
    
    const result = await db.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const result = await db.query('DELETE FROM cours WHERE id = $1 RETURNING id', [id]);
    return result.rowCount > 0;
  }
}

module.exports = new CoursRepository();
