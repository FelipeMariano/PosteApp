var express = require("express");
var Router = express.Router();
var User = require("../models/User");

function loginFailed(res){
  res.json({success: false, message: "user ou senha incorretos"});
}

Router.get("/signin", function(req, res, next){
  var _user = req.body.user;
  var _password = req.body.pass;

  User.findOne({user: user}, function(err, user, next){
    if(err) next(err);

    if(!_user || user.password != password)
      loginFailed(res);
    else {
      res.json({
        success: true,
        user: user
      });
    }
  });

  res.json();
});

module.exports = Router;
