var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: String,
  name: String,
  avatar: String,
  company: String,
  bio: String,
  birthdate: String,
  country: String,
  phone: String,
  twitter: String,
  facebook: String,
  google: String,
  linkedin: String,
  instagram: String,
  quora: String,
})

var User = mongoose.model('User', userSchema, 'users')

module.exports = User;