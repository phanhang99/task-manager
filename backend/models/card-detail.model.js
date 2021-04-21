var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  title: String,
  date_start: String,
  date_end: String,
  id_label: [{ type: Schema.Types.ObjectId, ref: 'Label' }],
  id_card: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  attach_file: Array,
  id_comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  id_user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

var CardDetail = mongoose.model('CardDetail', userSchema, 'card-details')

module.exports = CardDetail ;