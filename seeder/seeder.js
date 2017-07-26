var Post = require("../models/Post");
var Comm = require("../models/Comment");
var seeder = require("mongoose-seeder");
var data = require("./seed.json");
var mongoose = require("mongoose");

var seed = () => {
  Post.remove({}, function(){
    console.log("posts deleted!");
  });

  seeder.seed(data).then(function(data){
    console.log("seeded c/ sucesso!");
  }).catch(function(err){
    console.log("erro:");
    console.error(err);
  });
}

module.exports = seed;
