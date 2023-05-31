const heroesService = require('../services/heroes.service');

// Получить список героев
const getAllHeroes = async (req, res) => {
  try {
    const heroes = await heroesService.getAllHeroes();
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получить информацию о конкретном герое
const getHeroById = async (req, res) => {
  try {
    const hero = await heroesService.getHeroById(req.params.id);
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Создать нового героя
const createHero = async (req, res) => {
  try {
    const hero = await heroesService.createHero(req.body);
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновить информацию о герое
const updateHero = async (req, res) => {
  try {
    const hero = await heroesService.updateHero(req.params.id, req.body);
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удалить героя
const deleteHero = async (req, res) => {
  try {
    await heroesService.deleteHero(req.params.id);
    res.json({ message: 'Hero deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,
};