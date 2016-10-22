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

var gets = {
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
      m.circle.find( {owner: req.params.owner} , function(err,o){
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
          if(req.query.party=='yes'){
            o.yes[req.query.uid] = req.query.vote;
            o.save();
            res.json(o);
          }else{
            o.no[req.query.uid] = req.query.vote;
            o.save();
            res.json(o);
          }
        })
      }else{
        res.json({error: "circle unactive"});
      }
    })
  }
  // '/circle/:circleID/info': function(req,res){
  //   helper.has( res, m.circle, req.params.circleID, function(o){
  //     var arr = [];
  //     for(var i in o.party){
  //       helper.has(res, m.party , o.party[i] , function(o){
  //
  //       })
  //     }
  //     res.json({
  //       amount: 0
  //     })
  //   })
  // },
  // '/circle/:circleID/referee/:op/:uid': function(req,res){
  //   helper.has(res , m.circle , req.params.circleID , function(o){
  //     if(req.params.op == 'add'){
  //       o.referee.push(req.params.uid);
  //       o.save();
  //       res.json(o);
  //     }else{
  //       res.json({bad:o});
  //     }
  //   })
  // },
  // '/circle/:circleID/party': function(req, res){
  //   res.json({final:true});
  // },
  // '/circle/addparty/:id': function(req, res){
  //   res.json({final:true});
  // },
  // '/circle/remparty/:id': function(req, res){
  //   res.json({final:true});
  // },
  // '/circle/edit/:id': function(req, res){
  //   res.json({final:true});
  // },
  // '/user/vote/:partyID/:uid/:vote': function(req, res){
  //   helper.has(res, m.party , req.params.partyID , function(o){
  //     o.members.hasOwnProperty(req.params.uid) ? res.json({error: "vote added yet"}) :
  //     o.members[req.params.uid] = req.params.vote;
  //     o.save();
  //     res.json(o);
  //   })
  // },
}


for (var i in gets){
  router.get( i , gets[i]);
}

module.exports = router;
