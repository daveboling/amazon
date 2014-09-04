'use strict';

//Take an object, take its user ID and putting inside the Redis Session
//Serialize: User Object ----> userId (into Redis)
//Deserialize: userId -----> User Object


//Passport calls this function and takes two parameter: user to be serialized and a callback for when done
//serializing
module.exports = function(user, cb){
  //Create a little-user-id object, comes from Mongo
  var obj = {userId: user._id};
  //Takes two parameters: a error and an object created
  cb(null, obj);
};

