'use strict';

var logger = require('../../../logger');

module.exports = function (req, res, next) {
  var jsonapi = res.jsonapi || (res.jsonapi = {});

  logger.debug('initiate JSONAPI response');

  jsonapi.options = jsonapi.options || {};
  jsonapi.data = jsonapi.data || {};
  jsonapi.meta = jsonapi.meta || {};
  jsonapi.errors = jsonapi.errors || [];

  if (!('addError' in jsonapi.errors)) {
    jsonapi.errors.addError = function (title, detail) {
      this.push({ title: title, detail: detail });
    };
  }

  next();
};