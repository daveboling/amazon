'use strict';

var User = require('../models/user');

exports.new = function(req, res){
  res.render('users/new');
};

exports.login = function(req, res){
  res.render('users/login');
};

exports.logout = function(req, res){
  req.logout(); //Passport adds this onto NodeJS request for you. This removes info from req.user
  req.flash('notice', 'You have successfuly logged out');
  res.redirect('/');
};

exports.create = function(req, res){
  User.register(req.body, function(err, user){
    if(user){
      res.redirect('/');
    }else{
      res.redirect('/register');
    }
  });
};

exports.profile = function(req, res){
  res.render('users/profile');
};

exports.editProfile = function(req, res){
  res.locals.user.save(req.body, function(){
      res.render('users/edit');
  });
};

exports.edit = function(req, res){
  req.user.save(req.body, function(){
    res.redirect('/profile');
  });
};

