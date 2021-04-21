var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  name_group: String,
})

var GroupCard = mongoose.model('GroupCard', userSchema, 'group-cards')

module.exports = GroupCard;