'use strict';

module.exports = function (req, res, next) {
  var jsonapi = res.jsonapi
    , user = req.session.user;

  jsonapi.data = {
    id: user && user.id,
    type: 'user'
  };
  jsonapi.meta = user;
  req.session.user = null;

  next();
};