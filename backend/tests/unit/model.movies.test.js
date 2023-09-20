const connection = require('../../src/models/connection');
const chai = require('chai');
const sinon = require('sinon');
const {
  getAllMovies,
  movieCreate,
  movieBoddy,
} = require('../mocks/movies.mock');
const { movieModel } = require('../../src/models');
const { expect } = chai;

describe('Model: movies', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('getAll', () => {
    it('should return an array', async () => {
      // arrange
      sinon.stub(connection, 'execute').resolves([getAllMovies]);
      // act
      const movies = await movieModel.getAll();
      // assert
      expect(movies).to.be.an('array');
      expect(movies).to.be.deep.equal(getAllMovies);
    });
    it('shout create movie return an object with new movie', async () => {
      // arrange
      sinon.stub(connection, 'execute').resolves([{ insertId: 13 }]);
      // act
      const movie = await movieModel.createMovie(
        movieBoddy.name,
        movieBoddy.release_year,
        movieBoddy.director_id,
        movieBoddy.genre_id
      );
      // assert
      expect(movie).to.be.an('object');
      expect(movie).to.be.deep.equal(movieCreate);
    });
  });
});
