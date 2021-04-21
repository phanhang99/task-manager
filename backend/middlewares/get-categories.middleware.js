const Category = require('../models/category.model');

module.exports.getAll = async (req, res, next) => {
  Category.find().populate("id_team").then(categories => {
    res.locals.categories = categories
    next();
  },error => {
    res.status(500).send(error);
  })
}