const User = require('../models/user.model');
const md5 = require('md5');

module.exports.get = (req, res) => {
  var id = req.signedCookies.userId
  User.findById(id, function (err, user) {
    if(user) res.render('user/account',user)
    else res.status(400).send('Failed with invalid input parameter')
  });
}

module.exports.updateInfo = async (req, res) => {
  User.findById(req.signedCookies.userId, function (err, doc) {
    if (err){
      res.status(500).send('Failed with internal server error')
    }
    else if(!doc) res.status(400).send('Failed with invalid input parameter')
    for (const key of Object.keys(req.body)) {
      doc[key] = req.body[key];
    }
    doc.save(() => res.redirect('/user/getProfile'));
  });
}

module.exports.updatePassword = async (req, res,) => {
  User.findById(req.signedCookies.userId, function (err, doc) {
    if (err){
      res.status(500).send('Failed with internal server error')
    }
    else if(!doc) res.status(400).send('Failed with invalid input parameter')
    if(md5(req.body.oldpassword) === doc.password){
      doc.password = md5(req.body.newpassword);
      doc.save(() => res.redirect('/user/getProfile'));
    }
    else{
      res.status(400).send('Current password invalid')
    }
  });
}
