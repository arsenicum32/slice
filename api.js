var express = require('express');
var request = require('request');
var mongoose = require('mongoose');

var m = require('./db').m;

var router = express.Router();

var helper = {
  hasusers: function(res, query, callback){ // проверяем, существует ли пользователь в бд
    m.users.findOne( query, function(err,o){
      err?res.json({error:err}):o?callback(o):res.json({error:"no users found"});
    })
  },
  has: function(res, db , id , callback){
    db.findById( id , function(err,o){
      err?res.json({error:err}):o?callback(o):res.json({error: "object not found"});
    })
  }
}

var gets = {
  '/circle': function(req, res){ ////// получить все споры
    m.circle.find({}, function(err,o){
      res.json(err?{error:err}:o);
    })
  },
  '/circle/add/:uid': function(req,res){ ////// создать спор от пользователя
    helper.hasusers( res, {uid: req.params.uid }, function(o){
      res.json({good:o});
    })
  },
  '/circle/:circleID/info': function(req,res){
    helper.has( res, m.circle, req.params.circleID, function(o){
      var arr = [];
      for(var i in o.party){
        helper.has(res, m.party , o.party[i] , function(o){

        })
      }
      res.json({
        amount: 0
      })
    })
  },
  '/circle/:circleID/referee/:op/:uid': function(req,res){
    helper.has(res , m.circle , req.params.circleID , function(o){
      if(req.params.op == 'add'){
        o.referee.push(req.params.uid);
        o.save();
        res.json(o);
      }else{
        res.json({bad:o});
      }
    })
  },
  '/circle/:circleID/party': function(req, res){
    res.json({final:true});
  },
  '/circle/addparty/:id': function(req, res){
    res.json({final:true});
  },
  '/circle/remparty/:id': function(req, res){
    res.json({final:true});
  },
  '/circle/edit/:id': function(req, res){
    res.json({final:true});
  },
  '/user/vote/:partyID/:uid/:vote': function(req, res){
    helper.has(res, m.party , req.params.partyID , function(o){
      o.members.hasOwnProperty(req.params.uid) ? res.json({error: "vote added yet"}) :
      o.members[req.params.uid] = req.params.vote;
      o.save();
      res.json(o);
    })
  },
  '/party/:partyID/amount': function(req, res){
    helper.has(res, m.party , req.params.partyID , function(o){
      o.amount(function(amount){
        res.json({amount: amount});
      })
    })
  }
}


for (var i in gets){
  router.get( i , gets[i]);
}

module.exports = router;