var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  id_user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  id_card: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
})

var Team = mongoose.model('Team', userSchema, 'teams')

module.exports = Team;