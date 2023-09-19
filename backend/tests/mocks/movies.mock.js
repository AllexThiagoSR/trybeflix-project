const getAllMovies = [
  {
    movie_id: 1,
    movie_name: 'A Origem',
    release_year: 2010,
    director_name: 'Christopher Nolan',
    genre_name: 'Ficção Científica',
  },
  {
    movie_id: 2,
    movie_name: 'Tenet',
    release_year: 2020,
    director_name: 'Christopher Nolan',
    genre_name: 'Ação',
  },
  {
    movie_id: 3,
    movie_name: 'O Grande Truque',
    release_year: 2006,
    director_name: 'Christopher Nolan',
    genre_name: 'Drama',
  },
  {
    movie_id: 4,
    movie_name: 'Batman: O Cavaleiro das Trevas Ressurge',
    release_year: 2012,
    director_name: 'Christopher Nolan',
    genre_name: 'Ação',
  },
  {
    movie_id: 5,
    movie_name: 'Dunkirk',
    release_year: 2017,
    director_name: 'Christopher Nolan',
    genre_name: 'Ação',
  },
  {
    movie_id: 6,
    movie_name: 'Interestelar',
    release_year: 2014,
    director_name: 'Christopher Nolan',
    genre_name: 'Ficção Científica',
  },
  {
    movie_id: 7,
    movie_name: 'Amnésia',
    release_year: 2000,
    director_name: 'Christopher Nolan',
    genre_name: 'Mistério',
  },
];

const movieCreate = {
  movie_id: 13,
  name: 'Batman',
  release_year: 2008,
  director_id: 1,
  genre_id: 1,
};

const movieBoddy = {
  name: 'Batman',
  release_year: 2008,
  director_id: 1,
  genre_id: 1,
};

const fakeDirectors = [
  { id: 2, name: 'Director 2' },
  { id: 3, name: 'Director 3' },
];

const fakeDirectorsExists = [
  { id: 1, name: 'Director 2' },
  { id: 3, name: 'Director 3' },
];

const fakeGenres = [{ id: 2, name: 'Genre 2' }];

module.exports = {
  getAllMovies,
  movieCreate,
  fakeDirectors,
  fakeDirectorsExists,
  fakeGenres,
  movieBoddy,
};
