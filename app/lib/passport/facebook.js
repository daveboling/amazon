'use strict';

var FacebookStrategy  = require('passport-facebook').Strategy,
    User            = require('../../models/user'),
    config          = require('../../../config.js'),
    facebook          = new FacebookStrategy(
    {
      clientID: config.facebook.appId,
      clientSecret: config.facebook.appSecret,
      callbackURL: config.facebook.cb,
      enableProof: false
    },
      User.facebookAuthenticate);

module.exports = facebook;
