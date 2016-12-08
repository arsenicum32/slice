var socket = require('socket.io-client')('http://localhost:8080/');
/*
Регистрация пользователя login уникальный
socket.emit('register',{query:{
	nickname:'TTTT',
	login:'TTTTAAAAAC',
	password:'TTTTAAAAA'
}});
socket.on('register',response=>{
	console.log('register',response);
});

Описание ошибок
socket.emit('getCodes');
socket.on('getCodes',response=>{
	console.log('getCodes',response);
});

Получение массива всех споров
socket.emit('getAllFights');
socket.on('getAllFights',response=>{
	console.log('getAllFights',response);
	
});
socket.emit('addFight',{query:{
	ownerid:,
	flag:, // Флаг языка спора ru/cn/fr. Если не указано - то устанавливается en;
	time:, // Время создания timestamp
	name:, // Название
	text:, // Описание
	endtime: // Время окончания спора timestamp
}});
socket.on('addFight',response=>{
	console.log(response);
	
});

Авторизация пользователя
socket.emit('login',{query:{
	login:'TTTTAAAAAC',
	password:'TTTTAAAAA'
}});
socket.on('login',response=>{
	console.log('login',response);
	
});


*/
socket.on('connect',_=>console.log('connected'));
socket.on('disconnect',_=>console.log('disconnect'));