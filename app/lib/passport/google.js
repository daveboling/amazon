'use strict';

var GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy,
    User            = require('../../models/user'),
    config          = require('../../../config.js'),
    google          = new GoogleStrategy(
    {
      clientID:     config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL:  config.google.cb
    },
      User.googleAuthenticate);

module.exports = google;
