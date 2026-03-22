const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiant.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', etudiantController.getAll);
router.get('/:id', etudiantController.getById);

// Routes protégées par JWT
router.post('/', authMiddleware, etudiantController.create);
router.put('/:id', authMiddleware, etudiantController.update);
router.patch('/:id', authMiddleware, etudiantController.patch);
router.delete('/:id', authMiddleware, etudiantController.delete);

module.exports = router;
