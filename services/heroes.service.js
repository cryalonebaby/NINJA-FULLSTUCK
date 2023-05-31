const Hero = require('../models/hero.model');

// Получить список героев
const getAllHeroes = async () => {
  const heroes = await Hero.find();
  return heroes;
};

// Получить информацию о конкретном герое
const getHeroById = async (id) => {
  const hero = await Hero.findById(id);
  return hero;
};

// Создать нового героя
const createHero = async (heroData) => {
  const hero = await Hero.create(heroData);
  return hero;
};

// Обновить информацию о герое
const updateHero = async (id, heroData) => {
  const hero = await Hero.findByIdAndUpdate(id, heroData, { new: true });
  return hero;
};

// Удалить героя
const deleteHero = async (id) => {
  await Hero.findByIdAndDelete(id);
};

module.exports = {
  getAllHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,
};