const Card = require('../models/card.model');

module.exports.create = async (req, res) => {
  await Card.create(req.body).catch(err => {
    console.log(err);
    res.redirect('/')
  })
  res.redirect('/')
}