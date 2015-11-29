'use strict';

var Promise = require('bluebird')
  , logger = require('../../../logger')
  , runner = require('./runner');

module.exports = function (getInstanceMethod, getTotalCountMethod, errorTitle) {
  return runner(function (req) {
    logger.debug('fetch instance');

    return Promise
      .props({
        total: getTotalCountMethod(),
        instance: getInstanceMethod(req.params.instanceId)
      })
      .then(function (props) {
        return [ props.instance, { total: props.total }]; 
      });
  }, errorTitle);
};