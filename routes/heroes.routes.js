const { Router } = require('express');
const heroesController = require('../controllers/heroes.controller');
const router = Router()

// Get a list of heroes
router.get('/', heroesController.getAllHeroes);

// Get information about a specific hero
router.get('/:id', heroesController.getHeroById);

// Create a new hero
router.post('/', heroesController.createHero);

// Update hero information
router.put('/:id', heroesController.updateHero);

// Delete hero
router.delete('/:id', heroesController.deleteHero);

module.exports = router;