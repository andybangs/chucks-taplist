'use strict';

const Xray = require('x-ray');

module.exports = function fetchList(url) {
  return new Promise((resolve, reject) => {
    const xray = new Xray();

    xray(url, 'li',
      [{
        li: '',
        class: '@class',
      }]
    )
    (function(err, results){
      if (err) reject(err);

      results = results
        .filter(result => {
          return result.li.trim() && result.class.indexOf('header') === -1;
        })
        .map(result => {
          const beer = result.li.split('\n')
            .map(item => item.trim())
            .filter(item => item);

          const classes = result.class.trim().split(' ');

          return {
            tap: parseInt(beer[0].slice(0, -1), 10),
            brewery: beer[1],
            beer: beer[2],
            growler: beer[3],
            pint: beer[4],
            abv: parseFloat(beer[5]),
            classes
          }
        });

        resolve(JSON.stringify(results, null, '\t'))
    });
  });
}
