const connection = require('../../src/models/connection');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;
const app = require('../../src/app');
const { movieById } = require('./mocks/movies.mock');

chai.use(chaiHttp);

describe('Testing the route GET /movies/:id', function() {
  beforeEach(sinon.restore);

  it('Getting a movie that exists return the movie`s info', async function () {
    sinon.stub(connection, 'execute').resolves([[movieById]]);
    const response = await chai.request(app).get('/movies/1');
    expect(response).to.have.property('status', 200);
    expect(response.body).to.be.deep.equal(movieById);
  })

  it('Getting a movie that don`t exists return a not found error', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const response = await chai.request(app).get('/movies/150');
    expect(response).to.have.property('status', 404);
    expect(response.body).to.be.deep.equal({ message: 'Movie not found.' });
  })

  it('Getting a movie with an internal error', async function () {
    sinon.stub(connection, 'execute').rejects();
    const response = await chai.request(app).get('/movies/1');
    expect(response).to.have.property('status', 500);
    expect(response.body).to.be.deep.equal({ message: 'Internal server error.' });
  })
});
