'use strict';

var fs = require('fs')
  , path = require('path')
  , Sequelize = require('sequelize')
  , logger = require('../logger')
  , basename = path.basename(module.filename)
  , env = process.env.NODE_ENV || 'development'
  , config = require(path.resolve(__dirname, '..', '..', 'config', 'config.json'))[env]
  , db = {}
  , sequelize;

if (config) {
  if ('use_env_variable' in config && config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach(function(file) {
      var model;

      if (file.slice(-3) !== '.js') {
        return;
      }

      model = sequelize['import'](path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
} else {
  logger.warn('Unable to load database configuration');
}


module.exports = db;
