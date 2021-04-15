var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: String,
  firstname: String,
  lastname: String
})

var User = mongoose.model('User', userSchema, 'users')

module.exports = User;