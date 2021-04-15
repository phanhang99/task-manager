const User = require('../models/user.model');
const md5 = require('md5');

module.exports.get = (req, res) => {
  var id = req.signedCookies.userId
  User.findById(id, function (err, user) {
    if(user) res.status(200).send({username: user.username, email: user.email, firstname: user.firstname, lastname: user.lastname})
    else res.status(400).send('Failed with invalid input parameter')
  });
}

module.exports.updateInfo = async (req, res) => {
  User.findById(req.signedCookies.userId, function (err, doc) {
    if (err){
      res.status(500).send('Failed with internal server error')
    }
    else if(!doc) res.status(400).send('Failed with invalid input parameter')
    
    doc.email = req.body.email ? req.body.email : doc.email;
    doc.firstname = req.body.firstname ? req.body.firstname : doc.firstname
    doc.lastname = req.body.lastname ? req.body.lastname : doc.lastname
    doc.save(() => res.status(200).send({username: doc.username, email: doc.email, firstname: doc.firstname, lastname: doc.lastname}));
  });
}

module.exports.updatePassword = async (req, res,) => {
  User.findById(req.signedCookies.userId, function (err, doc) {
    if (err){
      res.status(500).send('Failed with internal server error')
    }
    else if(!doc) res.status(400).send('Failed with invalid input parameter')
    if(md5(req.body.currentpassword) === doc.password){
      doc.password = md5(req.body.newpassword);
      doc.save(() => res.status(200).send('Update Profile Successful'));
    }
    else{
      res.status(400).send('Current password invalid')
    }
  });
}
