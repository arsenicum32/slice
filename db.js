var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var Schema = mongoose.Schema;

mongoose.connect('mongodb://slice:slice@ds063856.mlab.com:63856/slice');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log(err);
});

db.once('open', function callback () {
    console.log('connect to db');
});

var scheme = {
  party: new Schema({
    members: Object,
    desc: String,
    data: Object,
    time: { type : Date, default: Date.now }
  }),
  users: new Schema({
    uid: {
      type: String,
      unique: true,
      required: true
    },
    balance: {type: Number, default: 0 },
    desc: String,
    data: Object,
    time : { type : Date, default: Date.now }
  }),
  circle: new Schema({
    name: String,
    desc: String,
    owner: String,
    data: Object,
    yes: Array,
    no: Array,
    referee: String,
    vote: Object,
    amount: Object,
    winco: {yes: {type:Object,default:{}}, no: {type:Object,default:{}}},
    win: {type: String, default: 'active'},
    tags: Array,
    deadline: Date,
    time: { type : Date, default: Date.now }
  })
}

// scheme.users.methods.amount = function(callback){
//
// }


scheme.circle.methods.count = function(callback){
  var y = this.yes, n = this.no;
  this.amount = {all:0,yes:0,no:0};
  this.winco.yes = {}, this.winco.no = {};
  for (var i in y){
    this.amount.all += parseFloat(y[i]);
    this.amount.yes += parseFloat(y[i]);
  }
  for (var i in n){
    this.amount.all += parseFloat(n[i]);
    this.amount.no += parseFloat(n[i]);
  }
  for(var i in this.yes){
    this.winco.yes[i] = parseFloat(this.yes[i]) + Math.floor( this.yes[i] / this.amount.yes * this.amount.no ) ;
  }
  for(var i in this.no){
    this.winco.no[i] = parseFloat(this.no[i]) + Math.floor( this.no[i] / this.amount.no * this.amount.yes ) ;
  }
  this.save();
  callback(this);
}

var users = mongoose.model('Users', scheme.users ),
    circle = mongoose.model('Circle', scheme.circle ),
    party = mongoose.model('Party', scheme.party );


    // circle.findOne({} , function(err,o){
    //   o?o.count(function(ob){
    //     console.log(ob);
    //   }):void(0);
    // });

// party.findOne({}, function(err,o){
//   o?
//   o.amount(function(t){
//     console.log(t);
//   }):void(0);
// })

var models = {
  'users': users,
  'circle': circle
  //'party': party
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

module.exports = {
  r: router,
  m: models
};
