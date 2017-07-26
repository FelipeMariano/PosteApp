var express = require("express");
var Router = express.Router();

var mongoose = require("mongoose");
var Post =require("../models/Post");
var Comm = require("../models/Comment");

function getComentarios(post){
  Comm.find({_id: {$in: post["comentarios"]}}).exec(function(err, comments){

    if(err) return [];

    return comments;
  });
}

Router.get("/", function(req, res, next){
  Post.find(function(err, posts){
    // posts.forEach((post) => {
    //     post.numComentarios = getComentarios(post).length;
    // });

    if(err) next(err);

    res.json(posts);

  });
});

Router.get("/:id", function(req, res, next){
  Post.findById(req.params.id, function(err, post){
    post.comentarios = this.getComentarios(post);
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

Router.post("/:id/comment", function(req, res, next){
  Post.findById(req.params.id, function(err, post){

    if(err) next(err);

    Comm.create(req.body, function(errComm, comentario){
      if(errComm) next(errComm);
      post.comentarios.push(comentario);
      post.save(function(errSavePost, savedPost){
        res.json(comentario);
      });
    });
  });
});
