const Team = require('../models/team.model');

module.exports.getAll = async (req, res, next) => {
  Team.find().then(teams => {
    res.locals.teams = teams
    next();
  },error => {
    res.status(500).send(error);
  })
}