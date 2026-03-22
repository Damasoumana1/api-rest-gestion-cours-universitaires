const db = require('../config/db');

class EtudiantRepository {
  async findAll() {
    const result = await db.query('SELECT * FROM etudiants ORDER BY id ASC');
    return result.rows;
  }

  async findById(id) {
    const result = await db.query('SELECT * FROM etudiants WHERE id = $1', [id]);
    return result.rows[0];
  }

  async save(etudiant) {
    const { nom, prenom, email, niveau } = etudiant;
    const result = await db.query(
      `INSERT INTO etudiants (nom, prenom, email, niveau) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nom, prenom, email, niveau]
    );
    return result.rows[0];
  }

  async update(id, etudiant) {
    const { nom, prenom, email, niveau } = etudiant;
    const result = await db.query(
      `UPDATE etudiants 
       SET nom = $1, prenom = $2, email = $3, niveau = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5 RETURNING *`,
      [nom, prenom, email, niveau, id]
    );
    return result.rows[0];
  }

  async patch(id, data) {
    const fields = [];
    const values = [];
    let queryIdx = 1;

    const dbFields = {
      nom: 'nom',
      prenom: 'prenom',
      email: 'email',
      niveau: 'niveau'
    };

    for (const [key, value] of Object.entries(data)) {
      if (dbFields[key]) {
        fields.push(`${dbFields[key]} = $${queryIdx}`);
        values.push(value);
        queryIdx++;
      }
    }

    if (fields.length === 0) return null;

    values.push(id);
    const query = `UPDATE etudiants SET ${fields.join(', ')} WHERE id = $${queryIdx} RETURNING *`;
    
    const result = await db.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const result = await db.query('DELETE FROM etudiants WHERE id = $1 RETURNING id', [id]);
    return result.rowCount > 0;
  }
}

module.exports = new EtudiantRepository();
