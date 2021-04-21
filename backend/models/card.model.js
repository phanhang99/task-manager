var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  id_category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  name_card: String,
  id_team: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
})

var Card = mongoose.model('Card', userSchema, 'cards')

module.exports = Card ;