'use strict';

const express = require('express');
const fetchList = require('./fetchList');

const app = express();
const port = process.env.PORT || 8080;

app.get('/api/beers', function(req, res) {
    fetchList('http://chucks85th.com/')
      .then((json) => {
        res.send(json);
      });
});

app.get('*', function(req, res) {
  res.sendfile('./index.html');
});

app.listen(port);
console.log('Express server started on port:', port);
