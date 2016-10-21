var express = require('express');
var request = require('request');

var router = express.Router();


var gets = {
  '/test': function(req,res){
    res.json({test:true});
  }
}


for (var i in gets){
  router.get( i , gets[i]);
}

module.exports = router;
