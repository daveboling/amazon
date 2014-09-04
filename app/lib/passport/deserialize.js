'use strict';

var User = require('../../models/user');

module.exports = function(obj, cb){
  User.findById(obj.userId, cb); //Returns err and user from Mongo
};
