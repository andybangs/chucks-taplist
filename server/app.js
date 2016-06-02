/* eslint no-console: 0 */
const express = require('express');
const apiRoutes = require('./api/routes');
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static(`${__dirname}/public`));
app.use('/api', apiRoutes);
app.get('*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(PORT, (err) => {
  if (err) console.error(err);
  else console.info('Express server started on port:', PORT);
});

module.exports = app;
