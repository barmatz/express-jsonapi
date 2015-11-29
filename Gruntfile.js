'use strict';

var tasks = require('./tasks')
  , config = require('./tasks/config');

module.exports = function (grunt) {
  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  tasks(grunt);
};