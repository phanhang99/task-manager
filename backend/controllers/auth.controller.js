const shortid = require('shortid');
const md5 = require('md5');
const User = require('../models/user.model');

module.exports.login = (req,res) => res.render('auth/login')

module.exports.postLogin = async (req,res) => {
  var username = req.body.username;
  var password = req.body.password;

  password = password ? md5(password) : ''
  
  var user = await User.findOne({ username: username, password: password }).catch( err => {
    res.status(500).send('Failed with internal server error')
  });
  if(!user){
    res.status(400).send('Invalid log-in id/password supplied')
    return;
  }
  res.cookie('userId',user.id, { signed: true, expires: new Date(Date.now() + 900000000)})
  res.redirect('/');
}

module.exports.logout = async (req, res) => {
  res.clearCookie('userId');
  res.redirect('/');
}

module.exports.create = (req, res) => {
  res.render('auth/register')
}

module.exports.postCreate = async (req, res) => {
  req.body.id = shortid.generate();
  req.body.password = md5(req.body.password);
  req.body.role = 'user'
  var user = await User.create(req.body).catch(err => {
    res.status(500).send('Failed with internal server error')
  })
  res.redirect('/')
}