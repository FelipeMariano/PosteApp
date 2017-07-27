var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");
const seeder = require("./seeder/seeder.js");

var app = express();
app.use(cors())
var routePosts = require("./routes/posts");

//AUTHENTICATION:
//TODO
//var auth = require("./routes/authenticate");
var jwt = require("jsonwebtoken");
var configuration = require("./configuration");
////

//adicionando o token
app.set("secretToken", configuration.secretToken);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

//MONGODB:
var dbUrl = "mongodb://localhost/poste";
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(dbUrl).then(() => {
  console.log("sucesso ao se conectar com mongodb!!|");
  //TODO
  seeder();
}).catch((err) => console.error(err));

var port = process.env.PORT || 3000;
app.listen(port);

console.log("starting...");

module.exports = app;
