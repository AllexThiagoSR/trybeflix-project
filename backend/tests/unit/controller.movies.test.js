const connection = require('../../src/models/connection');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
  getAllMovies,
  movieCreate,
  movieBoddy,
} = require('../mocks/movies.mock');

const { movieService } = require('../../src/services');
const { movieController } = require('../../src/controllers');

const { expect } = chai;

chai.use(sinonChai);

describe('Controller: movies', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('should return all movies', async () => {
    // arrange
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(movieService, 'getAll').resolves(getAllMovies);
    // act
    await movieController.getAll(req, res);
    // assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getAllMovies);
    expect(res.json).to.have.been.calledOnce;
  });
  it('should return movie created', async () => {
    // arrange
    const req = {
      body: movieBoddy,
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(movieService, 'createMovie')
      .resolves({ error: false, message: movieCreate });
    // act
    await movieController.createMovie(req, res);
    // assert
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(movieCreate);
    expect(res.json).to.have.been.calledOnce;
  });
});
