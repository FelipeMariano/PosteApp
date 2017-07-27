var express = require("express");
var Router = express.Router();
var mongoose = require("mongoose");
var User = require("../models/User");

function loginFailed(res){
  res.json({success: false, message: "user ou senha incorretos"});
}

Router.post("/signin", function(req, res, next){
  var user = req.body.user;
  var password = req.body.password;
  User.findOne({user: user}, function(err, user, next){
    if(err) next(err);

    if(!user || user.password != password)
      loginFailed(res);
    else {
      res.json({
        success: true,
        user: user
      });
    }
  });
});

module.exports = Router;
