var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
  name_category: String,
  id_team: { type: Schema.Types.ObjectId, ref: 'Team' },
})

var Category = mongoose.model('Category', userSchema, 'categories')

module.exports = Category;