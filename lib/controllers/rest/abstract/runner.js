'use strict';

var _ = require('underscore')
  , logger = require('../../../logger');

module.exports = function (deffer, errorTitle) {
  return function (req, res, next) {
    var jsonapi = res.jsonapi;

    function error(err) {
      logger.debug('runner error');
      logger.warn(err);
      jsonapi.errors.addError(errorTitle || 'Error', err.message);
    }

    function done() {
      logger.debug('runner finished');
      next();
    }

    try {
      logger.debug('start runner');
      deffer(req, res)
        .spread(function (data, meta) {
          logger.debug('runner process complete');
          jsonapi.data = data || null;
          jsonapi.meta = _.extend(jsonapi.meta, meta);
        })
        .catch(error)
        .finally(done);
    } catch (err) {
      error(err);
      done();
    }
  };
};