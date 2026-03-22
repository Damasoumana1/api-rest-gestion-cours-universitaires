const db = require('../config/db');

class UserRepository {
  async findByEmail(email) {
    const result = await db.query('SELECT * FROM utilisateurs WHERE email = $1', [email]);
    return result.rows[0];
  }

  async save(user) {
    const { nom, email, passwordHash, role } = user;
    const result = await db.query(
      `INSERT INTO utilisateurs (nom, email, password_hash, role) 
       VALUES ($1, $2, $3, $4) RETURNING id, nom, email, role, created_at`,
      [nom, email, passwordHash, role || 'user']
    );
    return result.rows[0];
  }
}

module.exports = new UserRepository();
