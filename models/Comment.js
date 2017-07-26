var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
  data: Date,
  autor: String,
  comentario: String,
  //user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  post: {type: mongoose.Schema.Types.ObjectId, ref: "Post"}
});

module.exports = mongoose.model("Comment", CommentSchema);
