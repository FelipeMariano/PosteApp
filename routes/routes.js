var express = require("express");
var Router = express.Router();

Router.get("/signin", function(req, res, next){
  res.json({
    message: "Deu certo!"
  });
});

module.exports = Router;
