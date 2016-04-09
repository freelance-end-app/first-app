var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
  name: String,
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  pictureLink: String,
  password: {type: String, required: true},
  Email: {type: String, required: true, unique: true}

});
