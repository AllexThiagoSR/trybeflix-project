const { movieModel } = require('../models');
const {
  validateDirector,
  validateGenre,
} = require('./validations/validations');

const getById = async (id) => {
  try {
    const movie = await movieModel.getById(id);
    if (!movie) return { status: 404, data: { message: 'Movie not found.' } };
    return { status: 200, data: movie };
  } catch (error) {
    return { status: 500, data: { message: 'Internal server error.' } };
  }
};

const update = async (id, payload) => {
  try {
    const updated = await movieModel.update(id, payload);
    if (!updated) return { status: 400, data: { message: 'Something went wrong on the update.' } };
    const movie = await movieModel.getById(id);
    if (!movie) return { status: 404, data: { message: 'Movie not found.' } };
    return { status: 200, data: { message: 'Successfully updated.', movie } };
  } catch (error) {
    if (error.message.includes('Cannot add or update')) {
      if (error.message.includes('director_id')) {
        return { status: 404, data: { message: 'Director not found' } };
      }
      if (error.message.includes('genre_id')) {
        return { status: 404, data: { message: 'Genre not found' } };
      }
    }
    return { status: 500, data: { message: 'Internal server error.' } };
  }
};

const deleteMovie = async (id) => {
  try {
    const movie = await movieModel.getById(id);
    if (!movie) return { status: 404, data: { message: 'Movie not found.' } };
    const deleted = await movieModel.deleteMovie(id);
    if (!deleted) return { status: 400, data: { message: 'Something went wrong on deletion.' } };
    return { status: 204 };
  } catch (error) {
    return { status: 500, data: { message: 'Internal server error.' } };
  }
};

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
  getById,
  update,
  deleteMovie,
};
