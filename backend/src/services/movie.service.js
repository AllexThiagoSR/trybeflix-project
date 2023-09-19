const { movieModel } = require('../models');
const {
  validateDirector,
  validateGenre,
} = require('./validations/validations');

const getAll = async () => {
  const movies = await movieModel.getAll();
  return movies;
};

const createMovie = async (name, release_year, director_id, genre_id) => {
  try {
    await Promise.all([validateDirector(director_id), validateGenre(genre_id)]);

    const movie = await movieModel.createMovie(
      name,
      release_year,
      director_id,
      genre_id
    );
    return {
      error: false,
      message: movie,
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
};

module.exports = {
  getAll,
  createMovie,
};
