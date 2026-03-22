const express = require('express');
const router = express.Router();
const coursController = require('../controllers/cours.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', coursController.getAllCours);
router.get('/:id', coursController.getCoursById);

// Routes protégées
router.post('/', authMiddleware, coursController.createCours);
router.put('/:id', authMiddleware, coursController.updateCours);
router.patch('/:id', authMiddleware, coursController.patchCours);
router.delete('/:id', authMiddleware, coursController.deleteCours);

module.exports = router;
