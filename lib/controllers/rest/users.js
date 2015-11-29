'use strict';

var users = require('../../services/users')
  , router = require('./abstract')
  , errorTitle = 'User error';

function createMethod(data) {
  return users.createUser(data.username, data.password);
}

function updateMethod(id, data) {
  return users.updateUser(id, data.username, data.password);
}

function deleteMethod(id) {
  return users.deleteUser(id);
}

function getInstanceMethod(id) {
  return users.getById(id);
}

function getInstancesMethod(offset, limit) {
  return users.getAll(offset, limit);
}

function getTotalCountMethod() {
  return users.getTotalCount();
}


module.exports = router(
  createMethod,
  updateMethod,
  deleteMethod,
  getInstanceMethod,
  getInstancesMethod,
  getTotalCountMethod,
  errorTitle
);