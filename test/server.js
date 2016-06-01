/* eslint-env mocha */

const request = require('supertest');
const server = require('../server');

describe('/api', () => {
  it('GET /api/85th/beers (valid request)', done => {
    request(server)
      .get('/api/85th/beers')
      .expect(200, done);
  });

  it('GET /api/cd/beers (valid request)', done => {
    request(server)
      .get('/api/cd/beers')
      .expect(200, done);
  });

  it('GET /api/foo/bar (invalid request)', done => {
    request(server)
      .get('/api/foo/bar')
      .expect(404, done);
  });
});

describe('*', () => {
  it('GET / (valid request)', done => {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('GET /foo/bar (valid request)', done => {
    request(server)
      .get('/foo/bar')
      .expect(200, done);
  });
});
