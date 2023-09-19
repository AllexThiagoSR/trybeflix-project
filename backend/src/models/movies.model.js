const connection = require('./connection');
const {
  GET_ALL_MOVIES_QUERY,
  GET_ALL_DIRECTORS_QUERY,
  GET_ALL_GENRES_QUERY,
  INSERT_MOVIE_QUERY,
} = require('./querys');

const getAll = async () => {
  const [movies] = await connection.execute(GET_ALL_MOVIES_QUERY);
  return movies;
};

const getDirectors = async () => {
  const [directors] = await connection.execute(GET_ALL_DIRECTORS_QUERY);
  return directors;
};

const getGenres = async () => {
  const [genres] = await connection.execute(GET_ALL_GENRES_QUERY);
  return genres;
};

const createMovie = async (name, release_year, director_id, genre_id) => {
  const [{ insertId }] = await connection.execute(INSERT_MOVIE_QUERY, [
    name,
    release_year,
    director_id,
    genre_id,
  ]);
  return {
    movie_id: insertId,
    name,
    release_year,
    director_id,
    genre_id,
  };
};

module.exports = {
  getAll,
  getDirectors,
  getGenres,
  createMovie,
};
