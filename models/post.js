var mongoose = require("mongoose");
var relationship = require("mongoose-relationship");

var PostSchema = new mongoose.Schema({
  data: Date,
  url: String,
  //user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  comentarios: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment', childPath: 'post'}]
});

CardSchema.plugin(relationship, {
  relationshipPathName: 'comentarios'
});

module.export = mongoose.model("Post", PostSchema);
