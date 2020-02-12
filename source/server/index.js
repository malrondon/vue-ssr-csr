import path from 'path';
import compression from 'compression';
import express from 'express';
import bodyParser from 'body-parser';
import dnscache from 'dnscache';
import pkg from '../../package.json';

const PORT = process.env.PORT || 8000;
const app = express();

// New Relic
global.newrelic = require('newrelic');

app.use(require('cookie-parser')());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

dnscache({
  enable: true,
  ttl: 300,
  cachesize: 1000,
});

/* Setup */
app.disable('x-powered-by');

/* Middlewares */
if (process.env.NODE_ENV === 'development') {
  const webpackMiddlewares = require('./middlewares/webpack').default;
  app.use(...webpackMiddlewares);
  app.use('/dist/', require('./middlewares/static').default);
}

app.use(compression());
app.use(express.static('dist'));

app.use('/mock', require('./controllers/mock').default);

app.get('/offline', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../../dist/offline/index.html'));
});

app.use('/health', require('./controllers/health').default);
app.use('/resource-status', require('./controllers/resource-status').default);

app.use('/', require('./controllers/app').default);
app.use(require('./controllers/error').default);

// START SERVER
/* eslint-disable */
const server = app.listen(PORT, () => console.log(`
WEB APP
Name:        ${pkg.name}
Version:     ${pkg.version}
NODE_ENV:    ${process.env.NODE_ENV}
Server running on ${process.env.PUBLIC_URL || 'localhost'}:${PORT}
`));
server.timeout = 5000;
/* eslint-enable */
