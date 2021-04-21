var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  id_category: { type: Schema.Types.ObjectId, ref: 'Category' },
  name_card: String,
})

var Card = mongoose.model('Card', userSchema, 'cards')

module.exports = Card ;