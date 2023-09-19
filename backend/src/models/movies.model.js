const connection = require('./connection');

const getAll = async () => {
  const [movies] = await connection.execute(
    'SELECT * FROM movies',
  );
  return movies;
}

module.exports = {
  getAll,
};
