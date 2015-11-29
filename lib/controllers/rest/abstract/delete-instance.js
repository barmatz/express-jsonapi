'use strict';

var logger = require('../../../logger')
  , runner = require('./runner');

module.exports = function (deleteMethod, errorTitle) {
  return runner(function (req) {
    logger.debug('delete instance');
    return deleteMethod(req.params.instanceId).then(function (instance) { return [ instance ]; });
  }, errorTitle);
};