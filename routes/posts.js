var express = require("express");
var Router = express.Router();

var mongoose = require("mongoose");
var Post =require("../models/Post");

Router.get("/", function(req, res, next){
  Post.find(function(err, posts){

    if(err) next(err);

    res.json(posts);

  });
});

Router.get("/:id", function(req, res, next){
  Post.findById(req.params.id, function(err, post){

    if(err) next(err);

    res.json(post);

  });
});

Router.post("/new", function(req, res, next){
  Post.create(req.body, function(err, post){

    if(err) next(err);

    res.json(post);
  });
});
