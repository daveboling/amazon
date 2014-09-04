'use strict';

var bcrypt = require('bcrypt'),
    Mongo  = require('mongodb'),
   _      = require('underscore-contrib'); 

function User(){
}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  User.collection.findOne({_id:_id}, function(err, obj){
    var user = Object.create(User.prototype);
    user = _.extend(user, obj);
    cb(err, user);
  });
};

User.register = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(user){return cb();}
    o.password = bcrypt.hashSync(o.password, 10);
    o.type = 'local';
    User.collection.save(o, cb);
  });
};

User.localAuthenticate = function(email, password, cb){
  User.collection.findOne({email:email}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(password, user.password);
    if(!isOk){return cb();}
    cb(null, user);
  });
};

User.twitterAuthenticate = function(token, secret, twitter, cb){
  //1. Check to see if twitterId already exists
  //2. If it IS true, return that user back via cb
  //3. If it doesn't exist yet, create a new user object using the constructor
  //4. Save that user to the database for persistant data.
  User.collection.findOne({twitterId:twitter.id}, function(err, user){ //1
    if(user){return cb(null, user);}//2 
    //3
    user = {twitterId:twitter.id, username:twitter.username, displayName:twitter.displayName, type:'twitter'};
    User.collection.save(user, cb);//4
  });
};

User.githubAuthenticate = function(accessToken, refreshToken, profile, cb){
  User.collection.findOne({githubId:profile.id}, function(err, user){
    if(user){return cb(null, user);} 
    user = {githubId:profile.id, username:profile.username, displayName:profile.displayName, type:'github'};
    User.collection.save(user, cb);
  });
};


User.googleAuthenticate = function(token, tokenSecret, google, cb){
  User.collection.findOne({githubId:google.id}, function(err, user){
    if(user){return cb(null, user);} 
    user = {githubId:google.id, username:google.displayName, displayName:google.displayName, type:'google'};
    User.collection.save(user, cb);
  });
};

User.facebookAuthenticate = function(token, tokenSecret, facebook, cb){
 User.collection.findOne({facebookId:facebook.id}, function(err, user){
   if(user){return cb(null, user);} 
   user = {facebookId: facebook.id, username:facebook.displayName, displayName:facebook.displayName, type:'facebook'};
   User.collection.save(user, cb);
 });
};

User.prototype.save = function(o, cb){
  var properties = Object.keys(o),
      self       = this;

  properties.forEach(function(property){
        self[property] = o[property];
  });

  User.collection.save(this, cb);
};


module.exports = User;

