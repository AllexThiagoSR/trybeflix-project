const { movieModel } = require('../models');

const getAll = async () => {
  const movies = await movieModel.getAll();
  return movies;
};

module.exports = {
  getAll,
};
