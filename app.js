var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;

var routes = require("./routes/routes");
app.use("/api", routes);
app.listen(port);

module.exports = app;
