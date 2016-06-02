/* eslint-env mocha */
const request = require('supertest');
const app = require('./app');

describe('/api', () => {
  it('GET /api/85th/beers (valid request)', done => {
    request(app)
      .get('/api/85th/beers')
      .expect(200, done);
  });

  it('GET /api/cd/beers (valid request)', done => {
    request(app)
      .get('/api/cd/beers')
      .expect(200, done);
  });

  it('GET /api/foo/bar (invalid request)', done => {
    request(app)
      .get('/api/foo/bar')
      .expect(404, done);
  });
});

describe('*', () => {
  it('GET / (valid request)', done => {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('GET /foo/bar (valid request)', done => {
    request(app)
      .get('/foo/bar')
      .expect(200, done);
  });
});
