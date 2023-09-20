const connection = require('../../src/models/connection');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;
const app = require('../../src/app');
const { movieById, updatedMovie } = require('./mocks/movies.mock');
const { movieModel } = require('../../src/models');

chai.use(chaiHttp);

describe('Testing the route PUT /movies/:id', function() {
  beforeEach(sinon.restore);

  it('Updating a existent movie', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    sinon.stub(movieModel, 'getById').resolves(updatedMovie);

    const response = await chai.request(app).put('/movies/1')
      .send({
        name: 'A ORIGEM',
        releaseYear: 2010,
        directorId: 1,
        genreId: 1,
      });
    expect(response).to.have.property('status', 200);
    expect(response.body).to.be.deep.equal({
      message: 'Successfully updated.',
      movie: {
        movie_id: 1,
        movie_name: 'A ORIGEM',
        release_year: 2010,
        director_name: 'Christopher Nolan',
        genre_name: 'Ação',
      },
    });
  });
});
