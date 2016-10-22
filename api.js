var express = require('express');
var request = require('request');
var mongoose = require('mongoose');

var m = require('./db').m;

var router = express.Router();

var helper = {
  hasusers: function(res, query, callback){ // проверяем, существует ли пользователь в бд
    m.users.findOne( {uid: query}, function(err,o){
      err?res.json({error:err}):o?callback(o):res.json({error:"no users found"});
    })
  },
  has: function(res, db , id , callback){
    db.findById( id , function(err,o){
      err?res.json({error:err}):o?callback(o):res.json({error: "object not found"});
    })
  }
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

var gets = {
  '/:md/find': function(req, res){
    IsJsonString(req.query.ask) ?
    m[req.params.md].find( JSON.parse(req.query.ask) , function(err,o){
      err?res.json({error:err}):o?res.json(o):res.json({error:"no " + 'users' + " found"});
    }): res.json({error: "can't parseJSON ask"});
  },
  '/:md/findone': function(req, res){
    IsJsonString(req.query.ask) ?
    m[req.params.md].findOne( JSON.parse(req.query.ask) , function(err,o){
      err?res.json({error:err}):o?res.json(o):res.json({error:"no " + 'users' + " found"});
    }): res.json({error: "can't parseJSON ask"});
  },
  '/users/new': function(req , res){
    res.json({good: true});
  },
  '/circle': function(req, res){ ////// получить все споры
    m.circle.find({}, function(err,o){
      var arr = [];
      for(var i in o){
        arr.push(o[i].id);
      }
      res.json(err?{error:err}:arr);
    })
  },
  '/circle/get': function(req , res){
    if(req.query.owner){
      m.circle.find( {owner: req.query.owner} , function(err,o){
        err?res.json({error: err}):res.json(o);
      })
    }else{
      req.json({error: "no owner query passed"});
    }
  },
  '/circle/get/:id': function(req , res){
    m.circle.findById( req.params.id , function(err,o){
      err?res.json({error: err}):o.count(function(f){
        res.json(f);
      });
    })
  },
  '/circle/new': function(req,res){ ////// создать спор от пользователя
    var arr = ['owner', 'referee', 'name' , 'desc'];
    for(var n in arr){
      if(!req.query[arr[n]]){
        res.json({error:"no query "+arr[n]+" passed"});
        return;
      }
    }
    helper.hasusers( res , req.query.owner , function(o){
      var nc = new m.circle(req.query);
      nc.save(function(err){
        err?res.json({error: err}):res.json({good:o});
      })
    })
  },
  '/circle/vote': function(req, res){
    arr = ['uid', 'vote', 'cid', 'party'];
    for(var n in arr){
      if(!req.query[arr[n]]){
        res.json({error:"no query "+arr[n]+" passed"});
        return;
      }
    }
    helper.has(res, m.circle, req.query.cid, function(o){
      if(o.win == 'active'){
        helper.hasusers( res , req.query.uid , function(u){
            o[req.query.party][ req.query.uid ] = parseFloat(req.query.vote) ;
            o.save();
            res.json(o);
        })
      }else{
        res.json({error: "circle unactive"});
      }
    })
  }
}


for (var i in gets){
  router.get( i , gets[i]);
}

module.exports = router;
