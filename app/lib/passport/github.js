'use strict';

var GithubStrategy  = require('passport-github').Strategy,
    User            = require('../../models/user'),
    config          = require('../../../config.js'),
    github          = new GithubStrategy(
    {
      clientID:       config.github.apiKey,
      clientSecret:   config.github.apiSecret,
      callbackURL:    config.github.callbackUrl
    },
      User.githubAuthenticate);

module.exports = github;
