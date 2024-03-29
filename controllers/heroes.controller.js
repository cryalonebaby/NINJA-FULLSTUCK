const heroesService = require('../services/heroes.service');
const logger = require('../config/logger.config')

// Get a list of heroes
const getAllHeroes = async (req, res) => {
  try {
    const { page } = req.query;
    const heroes = await heroesService.getAllHeroes(page);
    res.json(heroes);
  } catch (error) {
    logger.error('Failed to get all heroes!', error);
    res.status(500).json({ message: 'Failed to get all heroes!', error: error.message });
  }
};

// Get information about a specific hero
const getHeroById = async (req, res) => {
  const { id } = req.params;
  try {
    const hero = await heroesService.getHeroById(id);
    res.json(hero);
  } catch (error) {
    logger.error(`Hero with id ${id} not found!`, error);
    res.status(404).json({ message: `Hero with id ${id} not found!`, error: error.message });
  }
};

// Create a new hero
const createHero = async (req, res) => {
  try {
    const hero = await heroesService.createHero(req.body);
    res.json(hero);
  } catch (error) {
    logger.error('Failed to create new hero!', error);
    res.status(500).json({ message: 'Failed to create new hero!', error: error.message });
  }
};

// Update hero information
const updateHero = async (req, res) => {
  const { id } = req.params;
  try {
    const hero = await heroesService.updateHero(id, req.body);
    res.json(hero);
  } catch (error) {
    logger.error(`Failed to delete the hero by id: ${id}!`, error);
    res.status(500).json({ message: `Failed to delete the hero by id: ${id}!`, error: error.message });
  }
};

// Delete hero
const deleteHero = async (req, res) => {
  const { id } = req.params;
  try {
    await heroesService.deleteHero(id);
    res.json({ message: 'Hero deleted successfully' });
  } catch (error) {
    logger.error(`Failed to delete the hero by id: ${id}!`, error);
    res.status(500).json({ message: `Failed to delete the hero by id: ${id}!`, error: error.message });
  }
};

module.exports = {
  getAllHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,
};