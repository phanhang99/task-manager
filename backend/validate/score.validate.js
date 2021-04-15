const Score = require('../models/score.model');

module.exports.validateScore = async (req, res, next) => {
  var errors = [];
  if(!req.body.name){
      errors.push('Name is required.');
  }
  if(!req.body.content){
      errors.push('Content is required.');
  }
  if(!req.body.level){
    errors.push('Level is required.');
}
  if(errors.length) {
    res.status(400).send('Failed with incorrect one time password')
    return;
  }
  next();
}