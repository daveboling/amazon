'use strict';

var config = {};

config.twitter = {
  apiKey       : '1XTc4oiTYea9M9AUyqSdJdZxl',
  apiSecret    : process.env.TWITTER_SECRET,
  callbackUrl  : 'http://dboling.com:3002/auth/twitter/callback'
};

config.github = {
  apiKey       : 'c9f19225a848569ffa02',
  apiSecret    : process.env.GITHUB_SECRET,
  callbackUrl  : 'http://dboling.com:3002/auth/github/callback'
};

config.google = {
  clientID     : '1066554553786-o4b3k1brbrs7k6jrpp7vgsg5r80limm8.apps.googleusercontent.com',
  clientSecret : process.env.GOOGLE_SECRET,
  cb           : 'http:/dboling/auth/google/callback'
};

config.facebook = {
  appId: '722820504420610',
  appSecret: process.env.FACEBOOK_SECRET,
  cb: 'http://localhost:3002/auth/facebook/callback'
};

module.exports = config;