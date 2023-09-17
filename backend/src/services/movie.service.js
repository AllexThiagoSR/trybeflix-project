const { movieModel } = require('../models');

const getById = async (id) => {
  try {
    const movie = await movieModel.getById(id);
    if (!movie) return { status: 404, data: { message: 'Movie not found' } };
    return { status: 200, data: movie };
  } catch (error) {
    return { status: 500, data: { message: 'Internal server error' } };
  }
};

const update = async (id, payload) => {
  try {
    const movie = await movieModel.getById(id);
    if (!movie) return { status: 404, data: { message: 'Movie not found' } };
    const updated = await movieModel.update(id, payload);
    if (!updated) return { status: 400, data: { message: 'Something went wrong on the update' } };
    return { status: 200, data: { message: 'Successfully updated' } };
  } catch (error) {
    return { status: 500, data: { message: 'Internal server error' } };
  }
}

module.exports = { getById, update };
