const User = require('../models/user.model');

module.exports.requireAuth = (req,res,next) => {
  if(!req.signedCookies.userId) {
    res.render("auth/login")
    return;
  }

  User.findById(req.signedCookies.userId, function(err, user){
    if(!user) {
      res.render("auth/login")
      return;
    }
    if(user) res.locals.user = { username: user.username , email: user.email, avatar: user.avatar}
  
    next();
  });
}