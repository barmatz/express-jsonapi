'use strict';

var logger = require('../../logger')
  , users = require('../../services/users');

module.exports = function (req, res, next) {
  var jsonapi = res.jsonapi
    , body = req.body
    , username = body.username
    , password = body.password;

  function error(message) {
    jsonapi.errors.addError('Login error', message);
  }

  logger.debug('looking up user with username %s and password %s', logger.color.info(username), logger.color.info(password));

  users
    .auth(username, password)
    .spread(function (autherized, user) {
      if (autherized) {
        req.session.user = user;
        jsonapi.data = {
          id: user.id,
          type: 'user'
        };
        jsonapi.meta = user;
      } else {
        jsonapi.options.status = 401;
        error('User not authorized');
      }
    })
    .catch(function (err) {
      logger.warn(err);
      error(err.message);
    })
    .finally(next);
};