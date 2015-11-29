'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username: 'test',
      password: '1234'
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
