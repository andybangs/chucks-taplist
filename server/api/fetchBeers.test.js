/* eslint-env mocha */
const expect = require('expect');
const fetchBeers = require('./fetchBeers');

describe('fetchBeers', () => {
  let beers85th;
  let beersCD;
  let beersGoogle;

  before((done) => {
    fetchBeers('http://chucks85th.com/draft')
      .then(json => {
        beers85th = JSON.parse(json);
        done();
      });
  });

  before((done) => {
    fetchBeers('http://cd.chucks85th.com/draft')
      .then(json => {
        beersCD = JSON.parse(json);
        done();
      });
  });


  before((done) => {
    fetchBeers('http://google.com')
      .then(json => {
        beersGoogle = JSON.parse(json);
        done();
      });
  });

  it('fetchBeers(\'http://chucks85th.com/draft\') return a non-empty array', () => {
    expect(beers85th).toBeAn(Array);
    expect(beers85th.length).toBeGreaterThan(0);
    expect(beers85th[0]).toMatch({
      class: /draft_odd/,
      tap: /1/,
    });
  });

  it('fetchBeers(\'http://cd.chucks85th.com/draft\') return a non-empty array', () => {
    expect(beersCD).toBeAn(Array);
    expect(beersCD.length).toBeGreaterThan(0);
    expect(beersCD[0]).toMatch({
      class: /draft_odd/,
      tap: /1/,
    });
  });

  it('fetchBeers(\'http://google.com\') return an empty array', () => {
    expect(beersGoogle).toBeAn(Array);
    expect(beersGoogle.length).toBe(0);
  });
});
