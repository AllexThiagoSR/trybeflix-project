const connection = require('./connection');

const getById = async (id) => {
  const [[movie]] = await connection.execute(
    'SELECT * FROM movies WHERE id = ?',
    [id],
  );
  return movie;
};

module.exports = { getById };
