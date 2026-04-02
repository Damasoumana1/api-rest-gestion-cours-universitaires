const express = require('express');
const router = express.Router();
const coursController = require('../controllers/cours.controller');

router.get('/', coursController.getAllCours);
router.get('/:id', coursController.getCoursById);
router.post('/', coursController.createCours);
router.put('/:id', coursController.updateCours);
router.patch('/:id', coursController.patchCours);
router.delete('/:id', coursController.deleteCours);

module.exports = router;
