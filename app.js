
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//const seeder = require('./models/seeder.js');

var app = express();
var routePosts = require("./routes/posts");

//AUTHENTICATION:
//TODO
//var auth = require('./routes/authenticate');
var jwt = require('jsonwebtoken');
var configuration = require('./configuration');
////

//adicionando o token
app.set('secretToken', configuration.secretToken);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//ROTAS:
app.use("/poste", routePosts);

//HANDLERS:
app.use(function(req, res, next){
  var err = new Error("Pag não encontrada");
  err.status = 404;
  next(err);
});

if(app.get("env") === "development"){
  app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.render("erro", {
      message: err.message,
      error: err
    });
  });
}

//MONGODB:

var mongoose = require("mongoose");
mongoose.Promise(global.Promise);

mongoose.connect("mongodb://localhost/poste").then(() => {
  console.log("sucesso ao se conectar com mongodb!!");
  //TODO
  //seeder();
}).catch((err) => console.error(err));

var port = process.env.PORT || 3000;
app.listen(port);

console.log("starting...");

module.exports = app;
