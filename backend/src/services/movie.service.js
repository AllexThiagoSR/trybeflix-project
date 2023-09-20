const { movieModel } = require('../models');

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
    return { status: 200, data: { message: 'Successfully deleted.' } };
  } catch (error) {
    return { status: 500, data: { message: 'Internal server error.' } };
  }
};

module.exports = { getById, update, deleteMovie };
