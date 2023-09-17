const connection = require('./connection');

const getById = async (id) => {
  const [[movie]] = await connection.execute(
    `
    SELECT
      movies.id AS id,
      movies.name AS name,
      directors.name AS director,
      release_year AS releaseYear,
      genres.name AS genre
    FROM movies
    INNER JOIN directors ON director_id = directors.id
    INNER JOIN genres ON genre_id = genres.id
    WHERE movies.id = ?;
    `,
    [id],
  );
  return movie;
};

module.exports = { getById };
