const { Router } = require('express');
const heroesController = require('../controllers/heroes.controller');
const router = Router()

// Получить список героев
router.get('/', heroesController.getAllHeroes);

// Получить информацию о конкретном герое
router.get('/:id', heroesController.getHeroById);

// Создать нового героя
router.post('/', heroesController.createHero);

// Обновить информацию о герое
router.put('/:id', heroesController.updateHero);

// Удалить героя
router.delete('/:id', heroesController.deleteHero);

module.exports = router;