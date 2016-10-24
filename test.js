var express = require('express');
var request = require('request');
var mongoose = require('mongoose');

var m = require('./db').m;

var router = express.Router();

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

var gets = {
  '/circle': function(req , res){
    var rs = '';
    function w(m){
      rs +=m;
    }

    function rdn(a){
      return a?Math.floor(Math.random() *a ):
      Math.floor(Math.random() *30 );
    }

    w('[')

    for(var i=1000 + rdn(2000) ;i>100 + rdn(200); i= i - rdn() ){
      w("{"+'"size": '+i+',"id": '+rdn(200000000)+"},");
    }

    w("{"+'"size": '+i+',"id": '+rdn(200000000)+"}]");

    res.json(JSON.parse(rs));
  }
}


for (var i in gets){
  router.get( i , gets[i]);
}

module.exports = router;
