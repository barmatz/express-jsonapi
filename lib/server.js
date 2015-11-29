'use strict';

var path = require('path')
  , express = require('express')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , morgan = require('morgan')
  , logger = require('./logger')
  , api = require('./controllers/rest')
  , app = express()
  , NODE_ENV = process.env.NODE_ENV || 'development'
  , isDevEnv = NODE_ENV === 'development'
  , server;

logger.info('Running in %s mode', logger.color.info(NODE_ENV));

app
  .use(morgan(isDevEnv ? 'dev' : 'common'))
  .use(session({
    secret: 'visa-backend-poc',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
  }))
  .use(bodyParser.json({ type: 'application/vnd.api+json' }))
  .use('/api', api)
  .use('/', express.static(path.resolve(__dirname, '..', 'public')));

server = app.listen(process.env.PORT || 3000, function () {
  var address = server.address();

  logger.info('server running at %s', logger.color.info(address.address + ':' + address.port));
});

module.exports = app;
