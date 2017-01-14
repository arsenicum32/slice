var io = require('socket.io').listen(8080);
var mongoose=require('mongoose');
const SETTINGS={
	mongoDB:{// default: host=localhost,port=27017,db=test
		host:'ds113668.mlab.com',
		port:'13668',
		db:'slice',
		user:'slice',
		pass:'slice'
	}
};
this.ErrorDescs={// Коды ошибок. В ответе всегда коды, а не тексты. получить список можно через api
	0:'Missing credentials',
	1:'invalid login',
	2:'invalid password',
	4:'invalid nickname',
	5:'server error',
	7:'user don\'t find',
	8:'login already used',
};
userSchema=new mongoose.Schema({
	vkid:{type:String,required:true,unique:true},
	nickname:{type:String,required:true},
	balance:{type:Int,default:0}
});
var User=mongoose.model('Users',userSchema);

var fightSchema=new mongoose.Schema({
	name:{type:String,required:true},			// Название
	cap1:{type:Int,default:0},				// Капитализация первой
	cap2:{type:Int,default:0},				// Второй стороны
	own1:{type:String,required:true},			// ID участника
	own2:{type:String,required:true},			// ID участника
	deadline:{type:Timestamp,required:true},	// Время окончания приема ставок
	end:{type:Timestamp,required:true},			// Время окончания спора
	desc:String,							// Описание
	sumdet1:Object,							// Ставки
	sumdet2:Object,							// Ставки
	likes:Object,
	dislikes:Object,
	views:Int,
	timeline:Object,
	team1:Object,							// Массив участников
	team2:Object,							// Массив участников
	chat1:Object,
	chat2:Object,
	private:Bool
});
var fight=mongoose.model('fight',fightSchema);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://'+SETTINGS.mongoDB.user+':'+SETTINGS.mongoDB.pass+'@'+(SETTINGS.mongoDB.host || 'localhost')+':'+(SETTINGS.mongoDB.port || 27017)+'/'+(SETTINGS.mongoDB.db || 'test'));

io.sockets.on('connection',socket=>{
	for(let method in this.structure){
	socket.on(method,req=>this.structure[method](req,response=>socket.emit(method,response)))}
});
/*
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
*/
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
	if(e)console.log(e);
	cb(user);
}));
this.structure={
	/*
	"register":(request,cb)=>{
		if(!request||!request.query){
			cb('{success:false,codes:[0]}');
			return;}
		var nickname=request.query.nickname||'',
			login=request.query.login||'',
			password=request.query.password||'';
		console.log({password:password,nickname:nickname,login:login});
		var valid=this.validMyDate({login:login,password:password,nickname:nickname});
		if(!valid.success)cb(JSON.stringify(valid));
		else(new User({password:password,nickname:nickname,login:login})).save().then(_=>{
			// Registration complete
			this.structure.login({query:{login:login,password:password}},cb)
		}).catch(e=>cb("{success:false,codes:["+(e.name==='MongoError'&&e.message.indexOf('duplicate key error collection')!==-1?8:5)+"]}"));
	},
	"login":(request,cb)=>{
		if(!request||!request.query){
			cb('{success:false,codes:[0]}');
			return;
		}
		passport.authenticate('local',data=>cb(data))(request);
	}
	*/
	"getCodes":(req,cb)=>cb(JSON.stringify(this.ErrorDescs)),
	"getAllFights":(request,cb)=>{
		fight.find({},(e,data)=>{
			if(e){
				cb('{success:false,error:'+JSON.stringify(e)+'}');
				console.log(e);
				return
			}
			var arr='[';
			for(var i=data.length-1;i>-1;--i){
			arr+='{_id:'+data[i]._id+',name:'+data[i].name+',likes:'+data[i].likes+',end:'+data[i].end+',deadline:'+data[i].deadline+'},'}
			arr=arr.substr(0,arr.length-1)+']';
			cb(arr);
		})
	},
	"addFight":(request,cb)=>{
		if(!request||!request.query){
			cb('{success:false,codes:[0]}');
			return;
		}
		(new fight({
			name:request.query.name,
			own1:request.query.own1,
			own2:request.query.own2,
			deadline:request.query.deadline, // new Date(Date.now()+3600e3*12)
			end:request.query.endtime
		})).save((e,data)=>{
			if(e)cb('{success:false,error:'+JSON.stringify(e)+'}');
			else cb('{success:true,data:'+JSON.stringify(data)+'}');
		});
	},
	"join":(request,cb)=>{
		if(!request||!request.query){
			cb('{success:false,codes:[0]}');
			return
		}
		fight.findOne({_id:request.query._id},(e,data)=>{
			if(e)cb('{success:false,error:'+JSON.stringify(e)+'}');
			else cb('{success:true,data:'+JSON.stringify(data)+'}');
		});
		
	},
	"bet":(request,cb)=>{
		if(!request||!request.query){
			cb('{success:false,codes:[0]}');
			return
		}
		var team=request.query.team;
		var amount=request.query.amount;
		var fightID=request.query._id;
		
		fight.findOne({_id:fightID},(e,data)=>{
			if(e)cb('{success:false,error:'+JSON.stringify(e)+'}');
			else{
				data['cap'+team]+=amount;
				
				cb('{success:true,data:'+JSON.stringify(data)+'}');
			}
		});
	},
	"login":(request,cb)=>{// VK auth details
		cb("IDONTKNOWHOWICANGETVKDETAILS");
		//Add to db in case new user.
	}
}
function user_changeNick(vkid,nick){
	User.update({vkid:vkid},{$set:{nickname:nick}},{upsert:true},function(err){
		if(err)throw err;
	})
}
function user_changeBalance(vkid,money){
	User.update({vkid:vkid},{$set:{balance:money}},{upsert:true},function(err){
		if(err)throw err;
	})	
}
function user_getOne(vkid){
	User.findOne({vkid:vkid},function(err,data){
		if(err)throw err;
	})
}
function fight_updateOne(id,obj){
	fight.update({_id:id},{$set:obj},{upsert:true},function(err){
		if(err)throw err;
	})	
}
function fight_getOne(id){
	fight.findOne({_id:id},function(err,data){
		if(err)throw err;
		console.log(data);
	})
}
function fight_getAll(){
	fight.find({},function(err,data){
		if(err)throw err;
		console.log(data);
	})
	//typeof arguments[arguments.length-1]==='function'
}
function fight_sendMessage(fID,vkid,text,team){
	fight.findOne({_id:fID},function(err,fightdetails){
		if(err)throw err;
		let chat='chat'+team;
		let obj={};
		obj[chat]=fightdetails[chat];
		obj[chat].push([vkid,text,Date.now()]);
		fight.update({_id:fID},{$set:obj},{upsert:true},function(err){
			if(err)throw err;
		});
	});
}
function fight_sendBet(fID,team,amount){
	fight.findOne({_id:fID},function(err,fightdetails){
		if(err)throw err;
		fight.update({_id:fID},{$set:obj},{upsert:true},function(err){
			if(err)throw err;
		});
	});
}
/*
VK auth(?)->getAllFights

*/
