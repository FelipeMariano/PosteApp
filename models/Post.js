var mongoose = require("mongoose");
var relationship = require("mongoose-relationship");

var PostSchema = new mongoose.Schema({
  titulo: String,
  data: Date,
  url: String,
  //user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  comentarios: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment', childPath: 'post'}]
});

PostSchema.plugin(relationship, {
  relationshipPathName: 'comentarios'
});

module.exports = mongoose.model("Post", PostSchema);
