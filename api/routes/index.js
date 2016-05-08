/* eslint new-cap: 0 */

const router = require('express').Router();
const fetchChucksList = require('../fetchChucksList');

router.get('/85th/beers', (req, res) => {
  fetchChucksList('http://chucks85th.com/')
    .then((json) => {
      res.send(json);
    });
});

router.get('/cd/beers', (req, res) => {
  fetchChucksList('http://cd.chucks85th.com/')
    .then((json) => {
      res.send(json);
    });
});

module.exports = router;
