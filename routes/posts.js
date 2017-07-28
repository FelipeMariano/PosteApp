var express = require("express");
var Router = express.Router();

var mongoose = require("mongoose");
var Post = require("../models/Post");
var Comm = require("../models/Comment");

function getComentarios(comentarios, callback){
  Comm.find({_id: {$in: comentarios}}).exec(function(err, comments){

    if(err) return [];

    callback(comments);
  });
}

Router.get("/", function(req, res, next){
  Post.find({}).sort({data: 'desc'}).exec(function(err, posts){
    if(err) next(err);

    res.json(posts);

  });
});

Router.get("/:id", function(req, res, next){
  Post.findById(req.params.id, function(err, post){
    getComentarios(post.comentarios, (comments) => {
      post.comentarios  = comments;
      if(err) next(err);

      res.json(post);
    });
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

Router.post("/:id/comment/delete", function(req, res, next){
  Post.findById(req.params.id, function(err, post){
    var id = req.body.idComentario;
    if(err) next(err);

    post.comentarios.remove(id);
    post.save(function(errSavePost, savedPost){
      getComentarios(post.comentarios, (comments) => {
        post.comentarios  = comments;
        if(err) next(err);

        res.json(post);
      });
    });
  });
});

module.exports = Router;
