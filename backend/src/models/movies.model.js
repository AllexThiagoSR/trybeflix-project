const connection = require('./connection');
const {
  GET_ALL_MOVIES_QUERY,
  GET_ALL_DIRECTORS_QUERY,
  GET_ALL_GENRES_QUERY,
  INSERT_MOVIE_QUERY,
} = require('./querys');

const getById = async (id) => {
  const [[movie]] = await connection.execute(
    `
    SELECT
      movies.id AS movie_id,
      movies.name AS movie_name,
      directors.name AS director_name,
      release_year AS release_year,
      genres.name AS genre_name
    FROM movies
    INNER JOIN directors ON director_id = directors.id
    INNER JOIN genres ON genre_id = genres.id
    WHERE movies.id = ?;
    `,
    [id],
  );
  return movie;
};

const update = async (id, { name, directorId, releaseYear, genreId }) => {
  const [{ affectedRows }] = await connection.execute(
    `
    UPDATE movies
    SET 
      name = ?,
      director_id = ?,
      release_year = ?,
      genre_id = ?
    WHERE id = ?;
    `,
    [name, directorId, releaseYear, genreId, id],
  );
  return affectedRows !== 0;
};

const deleteMovie = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM movies WHERE id = ?',
    [id]
  );
  return affectedRows !== 0;
};

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
  getById,
  update,
  deleteMovie,
};
