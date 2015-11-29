'use strict';

var logger = require('../../../logger');

module.exports = function (req, res, next) {
  var jsonapi = res.jsonapi
    , body = req.body
    , query = req.query;

  logger.debug('serialize JSONAPI response');

  res.set('Content-Type', 'application/vnd.api+json');

  jsonapi.meta.limit = query.limit || body.limit;
  jsonapi.meta.offset = query.offset || body.offset;

  if (jsonapi.errors.length > 0) {
    res.status(jsonapi.options.status || 500).json({
      errors: jsonapi.errors,
      meta: jsonapi.meta
    });
  } else if (jsonapi.data) {
    res.status(jsonapi.options.status || 200).json({
      data: jsonapi.data,
      meta: jsonapi.meta
    });
  } else {
    next();
  }
};