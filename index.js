'use strict';

const fetchList = require('./fetchList');
const fs = require('fs');

fetchList('http://chucks85th.com/')
  .then((json) => {
    fs.writeFile('./results.json', json);
  });
