const express = require('express');
const router = express.Router();
const levelController = require('../controllers/levelController');

// Routes pour les niveaux
router.get('/', levelController.getLevels); 
router.get('/new', levelController.getNewLevelForm); 
router.post('/', levelController.createLevel); 
router.get('/:id/edit', levelController.getEditLevelForm); 
router.post('/:id', levelController.updateLevel); 
router.delete('/:id', levelController.deleteLevel); // Utilisez DELETE ici

module.exports = router;
