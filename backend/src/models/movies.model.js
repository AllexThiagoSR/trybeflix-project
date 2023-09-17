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
}

module.exports = { getById, update };
