var mongoose = require('mongoose')

var scoreSchema = new mongoose.Schema({
  user_id: String,
  lesson_id: String,
  score: Number,
})

var Score = mongoose.model('Score', scoreSchema, 'scores')

module.exports = Score;