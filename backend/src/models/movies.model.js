const connection = require('./connection');
const {
  GET_ALL_MOVIES_QUERY,
  GET_ALL_DIRECTORS_QUERY,
  GET_ALL_GENRES_QUERY,
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

module.exports = {
  getAll,
  getDirectors,
  getGenres,
};
