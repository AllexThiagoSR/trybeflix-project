const { movieService } = require('../services');

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
};
