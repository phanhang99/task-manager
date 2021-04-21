const Team = require('../models/team.model');

module.exports.create = async (req, res) => {
  await Team.create(req.body).catch(err => {
    res.status(500).send('Failed with internal server error')
  })
  res.redirect('/')
}