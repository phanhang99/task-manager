const Category = require('../models/category.model');
const Card = require('../models/card.model');

module.exports.create = async (req, res) => {
  await Category.create(req.body).catch(err => {
    console.log(err);
    res.redirect('/')
  })
  res.redirect('/')
}
module.exports.getCategory = async (req, res) => {
  Card.find().populate("id_category").then(card => {
    console.log(card);
    res.render('table', {card, id_category: req.params.id})
  },error => {
    res.status(500).send(error);
  })
}