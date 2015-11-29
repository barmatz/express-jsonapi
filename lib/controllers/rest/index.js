'use strict';

var express = require('express')
  , jsonapi = require('./jsonapi')
  , login = require('./login')
  , logout = require('./logout')
  , users = require('./users')
  , router = express.Router();

router
  .use(jsonapi.initiate)
  .post('/login', login)
  .post('/logout', logout)
  .use('/users', users)
  .use(jsonapi.serialize);

module.exports = router;