var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  name_cate: String,
  id_group_card: [{ type: Schema.Types.ObjectId, ref: 'GroupCard' }],
})

var Category = mongoose.model('Category', userSchema, 'categories')

module.exports = Category;