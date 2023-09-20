const { movieService } = require('../services');

const getById = async (req, res) => {
  const { status, data } = await movieService.getById(req.params.id);
  return res.status(status).json(data);
};

const update = async (req, res) => {
  const { status, data } = await movieService.update(req.params.id, req.body);
  return res.status(status).json(data);
};

const deleteMovie = async (req, res) => {
  const { status, data } = await movieService.deleteMovie(req.params.id);
  return res.status(status).json(data);
};

const getAll = async (_req, res) => {
  const movies = await movieService.getAll();
  res.status(200).json(movies);
};

const createMovie = async (req, res) => {
  const { name, release_year, director_id, genre_id } = req.body;

  const movie = await movieService.createMovie(
    name,
    release_year,
    director_id,
    genre_id
  );

  movie.error
    ? res.status(400).json({ error: movie.message })
    : res.status(201).json(movie.message);
};

module.exports = {
  getAll,
  createMovie,
  getById,
  update,
  deleteMovie,
};
