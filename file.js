
var request=require('request');

//'user-agent':'Mozilla/5.0 (Linux; Android 6.0; FRD-AL10 Build/HUAWEIFRD-AL10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.91 Mobile Safari/537.36'
var fs=require('fs');
	var app=require('express')();
	app.get('/lol',(req,res)=>{
		console.log(req.headers);
		res.end(0);
	})
	app.get('/',(req,res)=>fs.readFile(__dirname+'/index.html','utf-8',(err,context)=>res.end(context)));
	app.get('/s',(req,res)=>{
	
		request({url:'https://accounts.google.com/signup',
			headers:{'user-agent':'Mobile Safari'}
		},(e,r,body)=>{
			res.end(body);
		});
	
	});
	app.post('/refreshCaptcha',(req,res)=>{
		request('https://store.steampowered.com/join/refreshcaptcha/',(e,r,gid)=>{
			try{
				gid=JSON.parse(gid).gid;
				console.log('Gid:',gid);
				res.end(gid);
			}catch(e){
				console.log(e);
				res.end();
			}
		});
	});
	const port=5000;
	app.listen(port,_=>console.log('Listening on '+port));

	
/*
На сайт выводится текущее количество аккаунтов (по json файлику).
Текущее количество имеющихся почт.
Есть функция регистрации аккаунтов.

1. Запросик на гугл с куками андроида и регистрация.

http://accounts.google.com/InputValidator?resource=SignUp
{"input01":{"Input":"Passwd","Passwd":"1111","PasswdAgain":"1111","FirstName":"","LastName":"","GmailAddress":"lol"},"Locale":"en"}



На сайте требуется ввести нужное количество капчи (30-40-50) штук.
Они введены верно, тогда спамятся запросы на регистрацию. Данные записываются в json.
После этого на каждый аккаунт происходит авторизация, изменяется имя аккаунта.

А я ручками подключаю телефон к каждому аккаунту.

Получить картинку:
https://store.steampowered.com/public/captcha.php?gid=504799469639994808

request({
	url:'https://store.steampowered.com/join/createaccount/',
	method:'post',
	form:{
		accountname:'test', 
		password:'test',
		email:'test',
		captchagid:'test',
		captcha_text:'test',
		i_agree:'1',
		//ticket:$('ticket').value,
		lt:0
}},(e,r,b)=>{
	console.log(b);
	
});
*/
/*
function FinishFormVerification( bCaptchaIsValid, bEmailIsAvailable )
{
		var errorString = '';

		var rgBadFields = { 
		accountname : false, 
		password : false, 
		reenter_password : false,
		email: false,
		reenter_email: false,
		captcha_text: false,
		ssa_body: false
	}
	
	var accountname = $('accountname').value;
	if ( accountname.length < 3 || accountname.length > 64 )
	{
		errorString += 'Введите имя аккаунта, состоящее как минимум из 3 символов, используя только буквы, цифры и знак «_».<br/>';
		rgBadFields.accountname = true;
	}
	else
	{
		var bNameOK = true;
		for( var i=0; i<accountname.length; ++i )
		{
			if ( accountname.charAt(i) >= 'a' && accountname.charAt(i) <= 'z' )
				continue;
			if ( accountname.charAt(i) >= 'A' && accountname.charAt(i) <= 'Z' )
				continue;
			if ( accountname.charAt(i) >= '0' && accountname.charAt(i) <= '9' )
				continue;
			if ( accountname.charAt(i) == '_' )
				continue;
				
			bNameOK = false;
		}
		if ( !bNameOK )
		{
			errorString += 'Введите имя аккаунта, состоящее как минимум из 3 символов, используя только буквы, цифры и знак «_».<br/>';
			rgBadFields.accountname = true;
		}
	}

	var password =  $('password').value;
	if ( password.length > 64 )
	{
		errorString += 'Введите пароль длиной не более 64 символов.<br/>';
		rgBadFields.password = true;
		rgBadFields.reenter_password = true;
	}

	if ( !g_bPasswordAvailable )
	{
		errorString += 'Введенный вами пароль недопустим. Пожалуйста, выберите другой, длиной минимум в 8 символов.<br/>';
		rgBadFields.password = true;
		rgBadFields.reenter_password = true;
	}
	
	var reenter_password = $('reenter_password').value;
	if ( reenter_password == '' )
	{
		errorString += 'Пожалуйста, подтвердите пароль.<br/>';
		rgBadFields.reenter_password = true;
	}
	else if ( password != reenter_password )
	{
		errorString += 'Пароль в обоих полях должен совпадать.<br/>';
		rgBadFields.password = true;
		rgBadFields.reenter_password = true;
	}
	
	var email = $('email').value;
	var email_regex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
	if ( email == '' || !email_regex.test(email) )
	{
		errorString += 'Введите существующий адрес эл. почты.<br/>';
		rgBadFields.email = true;
		rgBadFields.reenter_email = true;
	}
	
	var reenter_email = $('reenter_email').value;
	if ( reenter_email == '' )
	{
		errorString += 'Пожалуйста, подтвердите адрес эл. почты.<br/>';
		rgBadFields.reenter_email = true;
	}
	else if ( email != reenter_email )
	{
		errorString += 'Адрес эл. почты в обоих полях должен совпадать.<br/>';
		rgBadFields.email = true;
		rgBadFields.reenter_email = true;
	}

	if ( !bCaptchaIsValid )
	{
	
		errorString += 'Подтвердите, что вы не робот, введя приведенные ниже символы.<br/>';
		rgBadFields.captcha_text = true;
		
				RefreshCaptcha();
	}
	
	var ssa_check = $('i_agree_check');
	if ( !ssa_check.checked )
	{
		errorString += 'Для продолжения необходимо принять условия «Соглашения подписчика службы Steam».<br/>';
		rgBadFields.ssa_body = true;
	}

		for ( var key in rgBadFields )
	{
		if ( rgBadFields[key] )
			new Effect.Morph( key, {style: 'border-color: #FF9900', duration: 0.5 } )
		else
			$(key).style.borderColor = '#82807C';
	}

		if ( errorString != '' )
	{
				var rgErrors = errorString.split( '<br/>' );
				if ( rgErrors.length > 3 )
		{
			errorString = '';
			errorString = rgErrors[0] + '<br/>' + rgErrors[1] + '<br/>' + 'Другие ошибки выделены ниже.' + '<br/>';
		}		
	
		$('error_display').innerHTML = errorString;
		$('error_display').style.display = 'block';
		Effect.ScrollTo( 'error_display' );
		new Effect.Highlight( 'error_display', { endcolor : '#000000', startcolor : '#ff9900' } );
	}
	else
	{
		if ( bEmailIsAvailable )
		{
			ReallyCreateAccount();
		}
		else
		{
			$('cart_area').style.display = 'none';
			$('email_used_area').style.display = 'block';
			Effect.ScrollTo( 'email_used_area' );
		}
	}
}"
ReallyCreateAccount+''
"function ReallyCreateAccount()
{
	var bPSNAccountSetup = (typeof g_bPSNAccountSetup != 'undefined' && g_bPSNAccountSetup);
			
	++iAjaxCalls;
		new Ajax.Request( g_sBaseURL + 'join/createaccount/',
	{
	    method:'post', 	    parameters: { accountname : $('accountname').value, 
	    			  password : $('password').value,
	    			  email : $('email').value,
	    			  captchagid : $('captchagid').value,
	    			  captcha_text : $('captcha_text').value,
	    			  i_agree : $('i_agree_check').checked ? '1' : '0',
	    			  ticket : $('ticket').value,
	    			  count : iAjaxCalls,
	    			  lt : $('lt').value },
		onSuccess: function(transport) {
			var bSuccess = false;
			if (transport.responseText) {
				try {
					var result = transport.responseText.evalJSON(true);
				} catch (e) {
									}

				if (result && result.bSuccess)
					bSuccess = true;
			}
			if (!bSuccess) {
				$('cart_area').style.display = 'block';
				$('email_used_area').style.display = 'none';
				$('error_display').innerHTML = 'Не удалось создать запрос на создание аккаунта. Повторите попытку позже.<br/>';
				$('error_display').style.display = 'block';
				Effect.ScrollTo('error_display');
				new Effect.Highlight('error_display', { endcolor: '#CEC7BD', startcolor: '#CCC983' });

								if (result && result.ticket)
					$('ticket').value = result.ticket;

								if (result && result.redirect)
					window.location = result.redirect;
			}
			else if (bPSNAccountSetup) {
				window.location = g_sBaseURL + 'psn/setupcomplete?accountname=' + encodeURIComponent(result.accountname);
			}
			else {
				
												if ( result && result.redirect ) {
					window.location = result.redirect;
				} else if ( typeof g_strRedirectURL != 'undefined' ) {
					window.location = g_strRedirectURL;
				} else {
					window.location = g_sBaseURL;
				}
			}

		},
	    onFailure: function()
	    {
	    	$('cart_area').style.display = 'block';
      	  	$('email_used_area').style.display = 'none';
	     	$('error_display').innerHTML = 'Не удалось создать запрос на создание аккаунта. Повторите попытку позже.<br/>';
	      	$('error_display').style.display = 'block';
	      	Effect.ScrollTo( 'error_display' );
			new Effect.Highlight( 'error_display', { endcolor : '#CEC7BD', startcolor : '#CCC983' } );
		}
  });
}
*/
//this.steamuser.createAccount('test', 'test', 'test', (res,steamid)=>{	console.log(res,steamid);})
//this.fs=require('fs');
//var items=JSON.parse(this.fs.readFileSync('items.txt','utf-8'));
//var brazhapi=require('brazhapi')(process.argv);
//brazhapi.nativeSteam.getMyInventory({},data=>{});
	//console.log(data);
/*
Скрипт регистрации емаилов в yandex.
Скрипт регистрации в стим.


Получившиеся обмены по 100%
Белое
2$ на 1.94$ 0,97
4,3985 на 4.22
4,89 на (3.88+0.66)/0.95 но не (3.88+0.67)/0.95
4,89+0.59 на (3.88+0.66+0.55)/0.95 = 0,97771801767191701882443334613907 = +2,2789784%
но не
4,89+0.58 на (3.88+0.66+0.55)/0.95 = 0,97950543635139035889541037236602 = +2,0923379175%

4.89+0,62 на (3.85+0,69+0,58)/0.95
но не 4.89+0,37+0,25 на то же самое почему-то? Выходит, цена зависит от количества предметов.
=> на каждый предмет идёт какая-то минимальная наценка (допустим, +1 цент к цене)

	Однако почему-то меньшее количество предметов предпочтительно для сервиса.
	4.89+0.37+0.25 на 0.69+0.58+2.04+1.81
	Видимо если предлагать две вещи за его одну,
	то идет наценка по иным правилам, чем нежели за мою одну просить его две.


коэффициент между 0,97728985039285329889140027984071 = +2,3237885%
				и 0,97944247120869658809600688838661 = +2,098901099%

4.89+4.63+0.35 на (3.85+3.63+1.69)/0.95 = 0,97797685703620754012691302724897 = +2,2519084%
но не
4.89+4.63+0.54 на (3.85+3,63+1.88)/.95 = 0,97938683687349586690384011719159 = +2,1047008547%

4.63+4+0.14 на (4.01+3.14+1.07)/0.95 = 0,98661705575226549840965012302707 = +1,356447688564% ??!
но не
4.63+4+0.25 на (4.01+3.14+1.18)/0.95 = 0,98743480322427690848743480322428 = +1,272509003601% ??!

				


для наценка должна быть более
+2,1047008547%
и менее
+2,2519084%


Синее
11.9 на 11.64
Нож розовое
97.48 на 94.23 97.48/94.23=1,0345 97.48/94.23=1.0345 94.23/97.48=0.96666

Гипотеза:
В среднем, при 100% стоимости предмета, наценка должна быть более чем 2.1% при обмене одинакового количества вещей одной группы.






В общем задача: определить реальные коэффициенты для пользователя и бота.
Внутри одной группы и взаимосвязь между группами.




Баги:
  'StatTrak™ AK-47 | Neon Revolution (Factory New)': { buy: 312.2, sell: 305.893, count: 1 },
  '★ Karambit | Tiger Tooth (Factory New)': { buy: 407.64, sell: 399.405, count: 1 },
  undefined: { buy: 0, sell: NaN, count: 0 } }
  
откуда-то лезет undefined
*/



/*
this.request.post({
	url:'http://cs.money/check_price',
	headers:{'content-type':'application/x-www-form-urlencoded'},
	body:'array_items=[{"market_hash_name":"SSG 08 | Lichen Dashed (Field-Tested)","price":0,"permission":"both_side"}]'
},(e,r,data)=>{if(e)throw e;
	console.log(data);
});

this.request({
	url:'http://cs.money/load_inventory',
	headers:{Cookie:"steamid=76561198063060578; after_auth=true; csrf=t%2FD%2Bq3Y4udTvZWYxq25IdgofZhHBicRj5h11tTwr1zE%3D;"},
	json:true
},(e,r,data)=>{if(e)throw e;
	console.log(data);
});
*/


/*
var items=[ 'StatTrak™ Music Kit | Beartooth, Aggressive',
  'StatTrak™ Music Kit | Blitz Kids, The Good Youth',
  'StatTrak™ Music Kit | Hundredth, FREE',
  'StatTrak™ Music Kit | Neck Deep, Life\'s Not Out To Get You',
  'StatTrak™ Music Kit | Roam, Backbone',
  'StatTrak™ Music Kit | Skog, III-Arena',
  'StatTrak™ Music Kit | Twin Atlantic, GLA',
  'StatTrak™ Radicals Box',
  'Sticker | Seek & Destroy',
  '★ Bloodhound Gloves | Bronzed (Minimal Wear)',
  '★ Bloodhound Gloves | Snakebite (Minimal Wear)',
  '★ Specialist Gloves | Crimson Kimono (Minimal Wear)',
  '★ Sport Gloves | Pandora\'s Box (Minimal Wear)'];

console.log('load '+items.length);

var p=0;
var baditems=[];
lol=()=>{
	let array=[];
	let o=p;
	for(let i=0;i<1;++i){
		if(p==items.length)break;
		array.push(items[p]);
		p++;
	}
	var query='{"market_hash_name":"'+array[0]+'"}';
	for(let i=1,n=array.length;i<n;++i){query+=',{"market_hash_name":"'+array[i]+'"}'}
	this.request.post({
		url:'http://cs.money/check_price',
		headers:{'content-type':'application/x-www-form-urlencoded'},
		body:'array_items=['+query+']'
	},(e,r,data)=>{if(e)throw e;
		try{
			JSON.parse(data);
			
		}catch(e){
			if(data!=='OK'){
				console.log('err',o);
				for(let i=array.length-1;i>-1;--i){
					baditems.push(array[i]);
				}
			}
		}
		console.log(o+'/'+items.length,data);
		if(p<items.length)lol();
		else{
			console.log('Done!',baditems);
		}
	});
}
lol();

*/