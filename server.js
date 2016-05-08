/* eslint no-console: 0 */

const express = require('express');
const routes = require('./api/routes');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/public`));
app.use('/api', routes);
app.get('*', (req, res) => res.sendfile('./public/index.html'));
app.listen(PORT, () => console.log('Express server started on port:', PORT));
