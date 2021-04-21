var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  id_user: { type: Schema.Types.ObjectId, ref: 'User' },
  comment_content: String
})

var Comment = mongoose.model('Comment', userSchema, 'comments')

module.exports = Comment ;