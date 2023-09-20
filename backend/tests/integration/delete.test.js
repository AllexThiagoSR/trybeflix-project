const connection = require('../../src/models/connection');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;
const app = require('../../src/app');
const { movieById } = require('./mocks/movies.mock');
const { movieModel } = require('../../src/models');

chai.use(chaiHttp);

describe('Testing the route DELETE /movies/:id', function() {
  beforeEach(sinon.restore);

  it('Deleting a existent movie', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    sinon.stub(movieModel, 'getById').resolves(movieById);

    const response = await chai.request(app).delete('/movies/1');
    expect(response).to.have.property('status', 204);
    expect(response.body).to.be.deep.equal({});
  });

  it('Deleting a movie that don`t exists return a not found error', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const response = await chai.request(app).delete('/movies/150');
    expect(response).to.have.property('status', 404);
    expect(response.body).to.be.deep.equal({ message: 'Movie not found.' });
  })

  it('Deleting a movie with internal error', async function () {
    sinon.stub(connection, 'execute').rejects();
    const response = await chai.request(app).delete('/movies/1');
    expect(response).to.have.property('status', 500);
    expect(response.body).to.be.deep.equal({ message: 'Internal server error.' });
  });
});
