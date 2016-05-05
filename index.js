/* eslint no-console: 0 */

const express = require('express');
const fetchChucksList = require('./server/fetchChucksList');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/public`));

app.get('/api/beers', (req, res) => {
  fetchChucksList('http://chucks85th.com/')
    .then((json) => {
      res.send(json);
    });
});

app.get('/', (req, res) => {
  res.sendfile('./public/index.html');
});

app.listen(port);
console.log('Express server started on port:', port);
