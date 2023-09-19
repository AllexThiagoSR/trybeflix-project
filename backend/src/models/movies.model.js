const connection = require('./connection');
const { GET_ALL_MOVIES_QUERY } = require('./querys');

const getAll = async () => {
  const [movies] = await connection.execute(GET_ALL_MOVIES_QUERY);
  return movies;
};

module.exports = {
  getAll,
};
