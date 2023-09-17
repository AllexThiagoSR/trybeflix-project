const { movieModel } = require('../models');

const getById = async (id) => {
  try {
    const movie = await movieModel.getById(id);
    if (!movie) return { status: 404, data: { message: 'Movie not found' } };
    return { status: 200, data: movie };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: 'Internal server error' } };
  }
};

module.exports = { getById };
