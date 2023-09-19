const { movieModel } = require('../../models');

const validateDirector = async (director_id) => {
  const directors = await movieModel.getDirectors();
  const director = directors.find((director) => director.id === director_id);
  if (!director) {
    throw new Error('Diretor não encontrado');
  }
};

const validateGenre = async (genre_id) => {
  const genres = await movieModel.getGenres();
  const genre = genres.find((genre) => genre.id === genre_id);
  if (!genre) {
    throw new Error('Gênero não encontrado');
  }
};

module.exports = {
  validateDirector,
  validateGenre,
};
