'use strict';

var User = require('../models').User
  , logger = require('../logger');

function serializeUser(user) {
  return user && user.toJSON();
}

function getTotalCount() {
  logger.debug('get total users');

  return User.count();  
}

function getAll(offset, limit) {
  logger.debug('get users (offset: %d, limit: %d)', logger.color.info(offset), logger.color.info(limit));

  return User
    .findAll({
      offset: offset,
      limit: limit
    })
    .then(function (users) {
      return users.map(serializeUser);
    });
}

function getById(id, serialize) {
  if (arguments.length < 2) {
    serialize = true;
  } 

  logger.debug('get user with ID %s (serialize: %s)', logger.color.info('#' + id), logger.color.info(serialize));

  return User
    .findOne({
      where: {
        id: id
      }
    })
    .then(function (user) {
      if (serialize) {
        return serializeUser(user);
      }

      return user;
    });
}

function auth(username, password) {
  logger.debug('authenticate user (username: %s, password: %s)', logger.color.info(username), logger.color.info(password));
  
  return User
    .findOne({
      where: {
        username: username,
        password: password
      }
    })
    .then(function (user) {
      return [ !!user, serializeUser(user) ];
    });
}

function createUser(username, password) {
  logger.debug('create user (username: %s, password: %s)', logger.color.info(username), logger.color.info(password));
  
  if (!username) {
    throw new Error('username cannot be ' + JSON.stringify(username));
  }

  if (!password) {
    throw new Error('password cannot be ' + JSON.stringify(password));
  }

  return User
    .create({
      username: username,
      password: password
    })
    .then(serializeUser);
}

function updateUser(id, username, password) {
  logger.debug('update user %s (username: %s, password: %s)', logger.color.info('#' + id), logger.color.info(username), logger.color.info(password));
  
  return getById(id, false)
    .then(function (user) {
      if (!user) {
        throw new Error('User not found');
      }

      return user.update({
        username: username,
        password: password
      });
    })
    .then(serializeUser);
}

function deleteUser(id) {
  logger.debug('delete user %s', logger.color.info('#' + id));
  
  return getById(id, false)
    .then(function (user) {
      if (!user) {
        throw new Error('User not found');
      }

      return user.destroy();
    })
    .then(serializeUser);
}

module.exports = {
  getTotalCount: getTotalCount,
  getAll: getAll,
  getById: getById,
  auth: auth,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};