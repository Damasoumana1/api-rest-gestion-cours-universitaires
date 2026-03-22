const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');

class AuthService {
  async register(data) {
    const { nom, email, password, role } = data;

    if (!nom || !email || !password) {
      throw { status: 400, message: 'Nom, email et mot de passe sont obligatoires' };
    }

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw { status: 400, message: 'Cet email est déjà utilisé' };
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    return await userRepository.save({ nom, email, passwordHash, role });
  }

  async login(email, password) {
    if (!email || !password) {
      throw { status: 400, message: 'Email et mot de passe sont obligatoires' };
    }

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw { status: 401, message: 'Identifiants incorrects' };
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw { status: 401, message: 'Identifiants incorrects' };
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    });

    return {
      token,
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
        role: user.role
      }
    };
  }
}

module.exports = new AuthService();
