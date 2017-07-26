var express = require("express");
var router = express.Router();

router.get("/signin", function(req, res, next){
  res.json({
    message: "Deu certo!"
  });
});

module.exports = router;
