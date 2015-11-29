'use strict';

var logger = require('../../../logger')
  , runner = require('./runner');

module.exports = function (createMethod, errorTitle) {
  return runner(function (req) {
    logger.debug('create instance');

    return createMethod(req.body).then(function (instance) { return [ instance ]; });
  }, errorTitle);
};