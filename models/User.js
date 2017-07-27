var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  user: String,
  password: String,
  role: String
});

module.exports = mongoose.model("User", UserSchema);
