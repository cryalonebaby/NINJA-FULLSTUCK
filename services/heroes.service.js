const Hero = require('../models/hero.model');

// Get a list of heroes
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

// Get information about a specific hero
const getHeroById = async (id) => {
  const hero = await Hero.findById(id);
  return hero;
};

// Create a new hero
const createHero = async (heroData) => {
  const hero = await Hero.create(heroData);
  return hero;
};

// Update hero information
const updateHero = async (id, heroData) => {
  const hero = await Hero.findByIdAndUpdate(id, heroData, { new: true });
  return hero;
};

// Delete hero
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