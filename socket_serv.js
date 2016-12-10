var cookieParser = require('cookie-parser');
const cookie = require('cookie');//Разные вещи,для разных вещей служат

var express = require("express");
var Server = require("http").Server;
var session = require("express-session");

var app = express();
var server = Server(app);
var io = require('socket.io')(server)

const SETTINGS={
	mongoDB:{// default: host=localhost,port=27017,db=test
		host:'ds113668.mlab.com',
		port:'13668',
		db:'slice',
		user:'slice',
		pass:'slice'
	}
};

this.ErrorDescriptions={// Коды ошибок. В ответе всегда коды, а не тексты. получить список можно через api
	0:'Missing credentials',
	1:'invalid login',
	2:'invalid password',
	4:'invalid nickname',
	5:'server error',
	7:'user don\'t find',
	8:'login already used',
};

var mongoose = require('mongoose'),
		userSchema = new mongoose.Schema({
			login:{type:String,required:true,unique:true},
			password:{type:String,required:true},
			nickname:String
		}),
		fightSchema = new mongoose.Schema({
			ownerid:{type:String,required:true},
			endtime:{type:Number,required:true},
			time:{type:Number,required:true},
			size:{type:Number,required:true},
			desc:{type:Object,required:true}
		}),
		fight = mongoose.model('fight',fightSchema),
		User = mongoose.model('Users',userSchema);

var sessionSchema = new mongoose.Schema({
  		sid:{type:String,required:true,unique:true}
		}),
		sessionModel=mongoose.model('session',sessionSchema);

var ss = new sessionModel({ sid: 'fuckqwe123123' });


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://'+SETTINGS.mongoDB.user+':'+SETTINGS.mongoDB.pass+'@'+(SETTINGS.mongoDB.host || 'localhost')+':'+(SETTINGS.mongoDB.port || 27017)+'/'+(SETTINGS.mongoDB.db || 'test'));

const MongoStore = require('connect-mongo')(session);
var str = new MongoStore({ mongooseConnection: mongoose.connection })

var sessionMiddleware = session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: "keyboard cat",
    saveUninitialized: true,
    key:"fuck",
     resave: true
});

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(sessionMiddleware);

io.use(function(socket, next) {
    var handshakeData = socket.request;
    handshakeData.cookies = handshakeData.headers.cookie;
    var sidCookie1 = cookie.parse(handshakeData.cookies);
    var sidCookie = sidCookie1["fuck"]

    var sid = cookieParser.signedCookie(sidCookie, "keyboard cat");
    if(!sid){
        console.log('Not session found');
    }

    str.get(sid,function (error,resp) {
      if(error){
          console.log("not auth");
            next(new Error('not authorized'));

        }else if(resp){
              console.log("auth");
              socket.handshake.user = resp;
              next();
          }else
          {
              console.log("not auth");
              next(new Error('not authorized'));
          }

    })
});

io.sockets.on('connection',socket=>{

	for(let i in this.structure){
	socket.on(i,req=>{
		console.log(i,req);
		this.structure[i](req,_=>{
			socket.emit(i,_)
			console.log('callback',i,_);
		})

	})}
});

this.validMyDate=params=>{
	let codes=[];
	if(params.login===''||params.password===''||params.nickname==='')codes.push(0);
	else{
		(undefined!==params.login && (typeof params.login!=='string' || params.login.length<7 || params.login.length>20 || params.login!==params.login.replace(/[^\w\d_-]/gi,'')))&&codes.push(1);
		(undefined!==params.password && (typeof params.password!=='string' || params.password.length<7))&&codes.push(2);
		(undefined!==params.nickname && (typeof params.nickname!=='string' || params.nickname.length<3))&&codes.push(4);
	}
	return codes.length>0?{success:false,codes:codes}:{success:true};
}

var passport=require('passport'),
LocalStrategy=require('passport-local').Strategy;

passport.use('local',new LocalStrategy({usernameField:'login'},(login,password,cb)=>{
	let A={password:password,login:login};
	if(!this.validMyDate(A).success)cb('{success:false,codes:[7]}');
	else User.findOne(A,(e,usr)=>{
		if(e)cb('{success:false,codes:[5]}')
		else if(!usr)cb('{success:false,codes:[7]}');	// Пользователь не найден
		else cb('{success:true,id:"'+usr.id+'"}');	// Пользователь найден
	});
}));

passport.deserializeUser((id,cb)=>User.findOne({_id:id},(e,user)=>{
	if(e)log(e);
	cb(user);
}));

this.structure={
	"register":(request,cb)=>{
		if(!request||!request.query){
			cb('{success:false,codes:[0]}');
			return;
		}
		var nickname=request.query.nickname||'',
			login=request.query.login||'',
			password=request.query.password||'';
		console.log({password:password,nickname:nickname,login:login});
		var valid=this.validMyDate({login:login,password:password,nickname:nickname});
		if(!valid.success)cb(JSON.stringify(valid));
		else(new User({password:password,nickname:nickname,login:login})).save().then(_=>this.structure.login({query:{login:login,password:password}},cb))// Успешная регистрация
		.catch(e=>cb("{success:false,codes:["+(e.name==='MongoError'&&e.message.indexOf('duplicate key error collection')!==-1?8:5)+"]}"));
	},
	"login":(request,cb)=>{
		if(!request||!request.query){
			cb('{success:false,codes:[0]}');
			return;
		}
		passport.authenticate('local',data=>cb(data))(request);
	},
	"getCodes":(req,cb)=>cb(JSON.stringify(this.ErrorDescriptions)),
	"getAllFights":(request,cb)=>{ // query.flag=cn/ru/ua/.. - флаг языка спора
		fight.find({},(e,data)=>{
			if(e){
				cb('{success:false,error:'+JSON.stringify(e)+'}');
				console.log(e);return
			}
			var arr='[',
				flag=!!request&&!!request.query&&typeof request.query.flag==='string'?request.query.flag:'en';
			for(var i=data.length-1;i>-1;--i){arr+='{id:'+data[i]._id+',desc:'+data[i].desc[flag]+',size:'+data[i].size+'},'}
			cb(arr.substr(0,arr.length-1)+']');
		})
	},
	"addFight":(request,cb)=>{
		if(!request||!request.query){
			cb('{success:false,codes:[0]}');
			return;
		}
		var fl=request.query.flag||'en';
		var object={};
		object[fl]=[request.query.name,request.query.text];
		(new fight({ownerid:request.query.ownerid,time:request.query.time,desc:object,endtime:request.query.endtime,size:0})).save((e,data)=>{
			if(e)cb('{success:false,error:'+JSON.stringify(e)+'}');
			else cb('{success:true,data:'+JSON.stringify(data)+'}');
		});
	}
}

app.post('/fuck',function (req,res) {//тестовая хуйня,которая присылает sid сессии в express и эту сессию сохранеяет
  res.send(req.session.id);
  req.session.save(function(err) {
	});
})

server.listen(8080);
