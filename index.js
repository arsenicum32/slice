/*
Скрипт регистрации пользователя в mongoDB от 25.11.2016.

db.collectionName.find()
show dbs
use <db name>

show collections
show tables
db.getCollectionNames()

db.collection.drop() // Удалить записи
https://docs.mongodb.com/v3.0/reference/method/db.collection.drop/
https://docs.mongodb.com/v3.2/reference/mongo-shell/

User.findOne({$or:[{login:login},{email:email}]},(e,user_object)=>{});
*/
const SETTINGS={
	mongoDB:{// default: host=localhost,port=27017,db=test
		host:'',
		port:'',
		db:''
	},
	express:{
		port:5000// default: 8080
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
var mongoose=require('mongoose'),
userSchema=new mongoose.Schema({
	login:{type:String,required:true,unique:true},
	password:{type:String,required:true},
	nickname:String
}),User=mongoose.model('User',userSchema);
mongoose.connect('mongodb://'+(SETTINGS.mongoDB.host || 'localhost')+':'+(SETTINGS.mongoDB.port || 27017)+'/'+(SETTINGS.mongoDB.db || 'test'));
this.validMyDate=params=>{// params:{login,nickname,pass,email}
	let codes=[];
	if(params.login===''||params.password===''||params.nickname==='')codes.push(0);
	else{
		(undefined!==params.login && (typeof params.login!=='string' || params.login.length<7 || params.login.length>20 || params.login!==params.login.replace(/[^\w\d_-]/gi,'')))&&codes.push(1);
		(undefined!==params.password && (typeof params.password!=='string' || params.password.length<7))&&codes.push(2);
		//(undefined!==params.email && (typeof params.email!=='string' || params.email.indexOf('@')===-1 || params.email.indexOf('.')===-1))&&codes.push(3);
		(undefined!==params.nickname && (typeof params.nickname!=='string' || params.nickname.length<3))&&codes.push(4);
	}
	return codes.length>0?{success:false,codes:codes}:{success:true};
}

var passport=require('passport'),
LocalStrategy=require('passport-local').Strategy;

passport.use('local',new LocalStrategy({usernameField:'loginmail'},(loginmail,password,cb)=>{
	let A={password:password};
	A[(loginmail.indexOf('@')!==-1)?'email':'login']=loginmail;
	if(!this.validMyDate(A).success)cb(null,{},{message:'{success:false,codes:[7]}'});
	else User.findOne(A,(e,usr)=>{
		if(e)cb(e,{},{message:'{success:false,codes:[5]}'})
		else if(!usr)cb(null,{},{message:'{success:false,codes:[7]}'});	// Пользователь не найден
		else cb(null,usr,null);	// Пользователь найден
	});
	
}));

passport.deserializeUser((id,cb)=>User.findOne({_id:id},(e,user)=>{
	if(e)log(e);
	cb(user);
}));
this.structure={
	"register":(request,res)=>{// {success:true|false,codes:...}
		var nickname=request.query.nickname||'',
			login=request.query.login||'',
			email=request.query.email||'',
			password=request.query.password||'';
		var valid=this.validMyDate({login:login,password:password,email:email,nickname:nickname});
		if(!valid.success)res.end(JSON.stringify(valid));
		else
		(new User({password:password,nickname:nickname,login:login})).save(e=>{ // email:email,
			if(e){
				let lol=e.message.replace(/^[^"]+"([^"]+)".+/,'$1');
				console.log(lol);
				res.end("{success:false,codes:["+(e.name==='MongoError'&&e.message.indexOf('duplicate key error collection')!==-1?(lol==email?6:8):5)+"]}")
			}else{
				// Успешная регистрация
				res.redirect('/login?loginmail='+email+'&password='+password);
			}
		});
	},
	"login":(request,res,next)=>{
		passport.authenticate('local',(e,user,info)=>{
			if(e)console.log(e);
			if(!!user.id&&!!user)res.end('{success:true,id:"'+user.id+'"}');	// Авторизация прошла успешно
			if(user===false)res.end('{success:false,error:"'+info.message+'"}'); // Системная ошибка в json
			else res.end(info.message);
		})(request,res,next);
	},
	"errors":(req,res)=>res.end(JSON.stringify(this.ErrorDescriptions))
}

var app=(require('express'))();
app.use(passport.initialize());
app.use(passport.session());
for(let i in this.structure){
app.get("/"+i+"/",this.structure[i])}

const port=SETTINGS.express.port||8080;
app.listen(port,_=>console.log('Listening on '+port));

























