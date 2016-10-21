var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

mongoose.connect('mongodb://localhost/slice');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log(err);
});

db.once('open', function callback () {
    console.log('connect to penchat');
});

var users = mongoose.model('Users', {
  uid: {
    type: String,
    unique: true,
    required: true
  },
  balance: Number,
  desc: String,
  data: Object,
  time : { type : Date, default: Date.now }
});

var circle = mongoose.model('Circle', {
  name: String,
  title: String,
  desc: String,
  owner: String,
  data: Object,
  party: Array,
  referee: Array,
  vote: Object,
  win: String,
  tags: Array,
  deadline: Date,
  time: { type : Date, default: Date.now }
});

var party = mongoose.model('Party',{
  members: Object,
  data: Object,
  time: { type : Date, default: Date.now }
});

var models = {
  'users': users,
  'circle': circle,
  'party': party
}

var gets = {
  '/': function(req,res,next){
    var keys = [];
    for(var k in models) keys.push(k);
    res.json(keys);
  },
  '/:model/all': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      models[req.params.model].find({}, function(err,data){
        res.json(err?err:data);
      })
    }else{
      res.json({error: "no model find"});
    }
  },
  '/:model/get/:id': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      models[req.params.model].findById( req.params.id , function(err,o){
        o? res.json(o) : res.json({error: "not found"});
      })
    }else{
      res.json({error: "no model find"});
    }
  },
  '/:model/add': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      var ac = new models[req.params.model]( req.query );
      res.json(ac.save());
    }else{
      res.json({error: "no model find"});
    }
  },
  '/:model/upd/:id': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      models[req.params.model].findById( req.params.id , function(err,o){
        if(o){
          for(var i in req.query){
            o[i] = req.query[i];
          }
          res.json(o.save());
        } else {
          res.json({error: "not found"});
        }
      })
    }else{
      res.json({error: "no model find"});
    }
  },
  '/:model/rem/:id': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      if(req.query.token=='token'){
        models[req.params.model].findById(req.params.id , function(err,o){
          o? res.json(o.remove()) : res.json({error: "not found"})
        })
      }else{
        res.json({error: "no token passed"});
      }
    }else{
      res.json({error: "no model find"});
    }
  }
}

for (var i in gets){
  router.get( i , gets[i]);
}

module.exports = router;
