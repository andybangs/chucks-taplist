const express = require('express');
const routes = require('./api/routes');
const PORT = process.env.PORT || 8080;

const server = express();
server.use(express.static(`${__dirname}/public`));
server.use('/api', routes);
server.get('*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

/* eslint no-console: 0 */
server.listen(PORT, () =>
  console.log('Express server started on port:', PORT)
);

module.exports = server;
