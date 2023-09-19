const { movieService } = require('../services');

const getAll = async (_req, res) => {
  const movies = await movieService.getAll();
  res.status(200).json(movies);
};

module.exports = {
  getAll,
};
