'use strict';

const express = require('express');
const fetchList = require('./fetchList');

const app = express();
const port = process.env.PORT || 8080;
const router = express.Router();

router.get('/beers', function(req, res) {
    fetchList('http://chucks85th.com/')
      .then((json) => {
        res.send(json);
      });
});

app.use('/api', router);

app.listen(port);
console.log('Express server started on port:', port);
