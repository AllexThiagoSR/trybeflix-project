const GET_ALL_MOVIES_QUERY = `
  SELECT 
    movies.id AS movie_id,
    movies.name AS movie_name,
    movies.release_year,
    directors.name AS director_name,
    genres.name AS genre_name
  FROM movies
  INNER JOIN directors ON movies.director_id = directors.id
  INNER JOIN genres ON movies.genre_id = genres.id;
`;

const GET_ALL_DIRECTORS_QUERY = `SELECT id, name FROM directors;`;

const GET_ALL_GENRES_QUERY = `SELECT id, name FROM genres;`;

const INSERT_MOVIE_QUERY = `
  INSERT INTO movies (name, release_year, director_id, genre_id)
  VALUES (?, ?, ?, ?);
`;

module.exports = {
  GET_ALL_MOVIES_QUERY,
  GET_ALL_DIRECTORS_QUERY,
  GET_ALL_GENRES_QUERY,
  INSERT_MOVIE_QUERY,
};
