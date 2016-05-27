const Xray = require('x-ray');

module.exports = function fetchList(url) {
  return new Promise((resolve, reject) => {
    const xray = new Xray();

    xray(url, 'tr',
      [{
        class: '@class',
        tap: '.draft_tap',
        brewery: '.draft_brewery',
        beer: '.draft_name',
        pint: '.draft_price',
        growler: '.draft_growler',
        origin: '.draft_origin',
        abv: '.draft_abv',
      }]
    )((err, results) => {
      if (err) reject(err);

      const json = results && results
        .slice(0, results.length - 2)
        .map(result => {
          const returnObj = Object.assign({}, result);
          returnObj.classes = result.class.trim().split(' ');
          returnObj.abv = isNaN(result.abv) ? 0 : result.abv;

          const slashIndex = result.brewery.indexOf('/');
          if (slashIndex !== -1) {
            returnObj.brewery =
              `${result.brewery.slice(0, slashIndex)} / ${result.brewery.slice(slashIndex + 1)}`;
          }

          return returnObj;
        });

      resolve(JSON.stringify(json, null, '\t'));
    });
  });
};
