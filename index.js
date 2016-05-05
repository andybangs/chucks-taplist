/* eslint no-console: 0 */

const express = require('express');
const fetchList = require('./fetchList');

const app = express();
const port = process.env.PORT || 8080;

app.get('/api/beers', (req, res) => {
  fetchList('http://chucks85th.com/')
    .then((json) => {
      res.send(json);
    });
});

app.get('*', (req, res) => {
  res.sendfile('./index.html');
});

app.listen(port);
console.log('Express server started on port:', port);
