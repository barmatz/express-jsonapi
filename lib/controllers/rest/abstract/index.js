'use strict';

var express = require('express')
  , createInstance = require('./create-instance')
  , deleteInstance = require('./delete-instance')
  , fetchInstances = require('./fetch-instances')
  , fetchInstance = require('./fetch-instance')
  , updateInstance = require('./update-instance')
  , router = express.Router();


module.exports = function (createMethod, updateMethod, deleteMethod, getInstanceMethod, getInstancesMethod, getTotalCountMethod, errorTitle) {
  return router
    .get('/:instanceId', fetchInstance(getInstanceMethod, getTotalCountMethod, errorTitle))
    .patch('/:instanceId', updateInstance(updateMethod, errorTitle))
    .delete('/:instanceId', deleteInstance(deleteMethod, errorTitle))
    .get('/', fetchInstances(getInstancesMethod, getTotalCountMethod, errorTitle))
    .post('/', createInstance(createMethod, errorTitle));
};