const Hero = require('../models/hero.model');

// Получить список героев
const getAllHeroes = async (page) => {
  // number of records to show on one page
  const perPage = 5

  // total number of records
  const total = await Hero.countDocuments()

  // amount of pages
  const pages = Math.ceil(total / perPage)

  // get current page
  const current = page ?? 1

  // records start from
  const startFrom = (current - 1) * perPage

  const heroes = await Hero.find().skip(startFrom).limit(perPage).sort({ _id: -1 })

  return { pages, heroes };
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