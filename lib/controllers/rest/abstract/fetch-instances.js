'use strict';

var Promise = require('bluebird')
  , logger = require('../../../logger')
  , runner = require('./runner');

module.exports = function (getInstancesMethod, getTotalCountMethod, errorTitle) {
  return runner(function (req) {
    var query = req.query
      , offset = query.offset
      , limit = query.limit;

    logger.debug('fetch instances');

    return Promise
      .props({
        total: getTotalCountMethod(),
        instances: getInstancesMethod(offset, limit)
      })
      .then(function (props) {
        return [
          props.instances,
          {
            total: props.total,
            offset: offset,
            limit: limit
          }
        ]; 
      });
  }, errorTitle);
};