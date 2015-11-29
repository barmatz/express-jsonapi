'use strict';

var winston = require('winston')
  , chalk = require('chalk')
  , level = 'info'
  , logger;

switch (process.env.NODE_ENV) {
  default:
  case 'development':
    level = 'debug';
    break; 
  case 'test':
    level = 'test';
    break; 
  case 'production':
    level = 'info';
    break; 
}

logger = new winston.Logger({
  transports: [
    new winston.transports.Console({ colorize: true, level: level })
  ]
});

logger.color = {
  info: chalk.cyan
};

module.exports = logger;