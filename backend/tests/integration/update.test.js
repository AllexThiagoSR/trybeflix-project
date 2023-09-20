const connection = require('../../src/models/connection');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;
const app = require('../../src/app');
const { updatedMovie } = require('./mocks/movies.mock');
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

  it('Trying to update movie without send the name', async function () {
    const response = await chai.request(app).put('/movies/1')
      .send({
        releaseYear: 2010,
        directorId: 1,
        genreId: 1,
      });
    expect(response).to.have.property('status', 400);
    expect(response.body).to.be.deep.equal({
      message: '"name" is required',
    });
  });

  it('Trying to update movie without send the releaseYear', async function () {
    const response = await chai.request(app).put('/movies/1')
      .send({
        name: 'A ORIGEM',
        directorId: 1,
        genreId: 1,
      });
    expect(response).to.have.property('status', 400);
    expect(response.body).to.be.deep.equal({
      message: '"releaseYear" is required',
    });
  });

  it('Trying to update movie without send the directorId', async function () {
    const response = await chai.request(app).put('/movies/1')
      .send({
        name: 'A ORIGEM',
        releaseYear: 2010,
        genreId: 1,
      });
    expect(response).to.have.property('status', 400);
    expect(response.body).to.be.deep.equal({
      message: '"directorId" is required',
    });
  });

  it('Trying to update movie without send the genreId', async function () {
    const response = await chai.request(app).put('/movies/1')
      .send({
        name: 'A ORIGEM',
        releaseYear: 2010,
        directorId: 1,
      });
    expect(response).to.have.property('status', 400);
    expect(response.body).to.be.deep.equal({
      message: '"genreId" is required',
    });
  });

  it('Trying to update movie sending a director that don`t exists in database', async function () {
    sinon.stub(connection, 'execute').rejects(new Error(`
    Cannot add or update a child row: a foreign key constraint fails
    ('Trybeflix'.'movies', CONSTRAINT 'movies_ibfk_2' FOREIGN KEY ('director_id')
    REFERENCES 'directors' ('id'))
    `));

    const response = await chai.request(app).put('/movies/1')
      .send({
        name: 'A ORIGEM',
        releaseYear: 2010,
        directorId: 150,
        genreId: 1,
      });
    
    expect(response).to.have.property('status', 404);
    expect(response.body).to.be.deep.equal({
      message: 'Director not found',
    });
  });

  it('Trying to update movie sending a genre that don`t exists in database', async function () {
    sinon.stub(connection, 'execute').rejects(new Error(`
    Cannot add or update a child row: a foreign key constraint fails
    ('Trybeflix'.'movies', CONSTRAINT 'movies_ibfk_1' FOREIGN KEY ('genre_id')
    REFERENCES 'genres' ('id'))
    `));
    const response = await chai.request(app).put('/movies/1')
      .send({
        name: 'A ORIGEM',
        releaseYear: 2010,
        directorId: 1,
        genreId: 150,
      });
    
    expect(response).to.have.property('status', 404);
    expect(response.body).to.be.deep.equal({
      message: 'Genre not found',
    });
  });
});
