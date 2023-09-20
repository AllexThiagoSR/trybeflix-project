const chai = require('chai');
const sinon = require('sinon');
const {
  getAllMovies,
  movieCreate,
  fakeDirectorsExists,
  fakeGenres,
  fakeDirectors,
  movieBoddy,
} = require('../mocks/movies.mock');
const { movieService } = require('../../src/services');
const { movieModel } = require('../../src/models');
const { expect } = chai;

describe('Service: movies', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('should return all movies', async () => {
    // arrange
    sinon.stub(movieService, 'getAll').resolves(getAllMovies);
    // act
    const movies = await movieService.getAll();
    // assert
    expect(movies).to.be.an('array');
    expect(movies).to.be.deep.equal(getAllMovies);
  });
  it('should return movie created', async () => {
    // arrange
    sinon.stub(movieService, 'createMovie').resolves(movieCreate);
    // act
    const movies = await movieService.createMovie();
    // assert
    expect(movies).to.be.an('object');
    expect(movies).to.be.deep.equal(movieCreate);
  });
  it('should return error with director_id not found', async () => {
    // arrange
    sinon.stub(movieModel, 'getDirectors').resolves(fakeDirectors);
    const directorIdNotInList = 1;
    // act
    const result = await movieService.createMovie(
      movieBoddy.name,
      movieBoddy.release_year,
      directorIdNotInList,
      movieBoddy.genre_id
    );
    // assert
    expect(result).to.be.an('object');
    expect(result.error).to.be.true;
    expect(result.message).to.equal('Diretor não encontrado');
  });
  it('should return error with genre_id not found', async () => {
    // arrange
    sinon.stub(movieModel, 'getDirectors').resolves(fakeDirectorsExists);
    sinon.stub(movieModel, 'getGenres').resolves(fakeGenres);
    const genreIdNotInList = 1;
    // act
    const result = await movieService.createMovie(
      movieBoddy.name,
      movieBoddy.release_year,
      movieBoddy.director_id,
      genreIdNotInList
    );
    // assert
    expect(result).to.be.an('object');
    expect(result.error).to.be.true;
    expect(result.message).to.equal('Gênero não encontrado');
  });
});
