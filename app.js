var express = require('express');
var cors = require('cors');

var app = express();

app.use(cors());

app.use('/', require('./db') );
app.use('/', require('./api') );

app.all('*', function(req,res){
  res.json({error:404});
})

app.listen(20000);
