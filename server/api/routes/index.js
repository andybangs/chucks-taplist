/* eslint new-cap: 0 */

const router = require('express').Router();
const fetchBeers = require('../fetchBeers');

router.get('/85th/beers', (req, res) => {
  fetchBeers('http://chucks85th.com/draft')
    .then((json) => {
      res.send(json);
    });
});

router.get('/cd/beers', (req, res) => {
  fetchBeers('http://cd.chucks85th.com/draft')
    .then((json) => {
      res.send(json);
    });
});

router.get('*', (req, res) => {
  res.status(404).end();
});

module.exports = router;
