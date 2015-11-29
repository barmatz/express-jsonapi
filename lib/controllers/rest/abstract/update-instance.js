'use strict';

var logger = require('../../../logger')
  , runner = require('./runner');

module.exports = function (updateMethod, errorTitle) {
  return runner(function (req) {
    logger.debug('update instance');

    return updateMethod(req.params.instanceId, req.body).then(function (instance) { return [ instance ]; });
  }, errorTitle);
};