var mongoose = require('mongoose')
const Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  name_team: String,
  id_user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  id_card: { type: Schema.Types.ObjectId, ref: 'Card' },
})

var Team = mongoose.model('Team', userSchema, 'teams')

module.exports = Team;