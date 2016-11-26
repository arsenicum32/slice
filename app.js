import 'babel-polyfill';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';
import userModel from './models/users';
import bodyParser from 'body-parser';
import disputeModel from './models/dispute';

const app = express();

const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.listen(3000, ()=>{
  console.log('Server started on port 3000');
});

app.use(express.static(__dirname + '/client/src'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/src/index.html'));
});

app.get('/dispute/options/:name', (req, res) => {
  userModel.find({"username": new RegExp(req.params.name, "i")}, (err, users) => {
    if(err) console.log('cant find');
    res.send(users);
  });
});

app.post('/dispute/add', (req, res) => {
  console.log(req.body);
  let referees = req.body.referee.map(elem => {
    return elem.id;
  });
  let disputeAdd = new disputeModel(Object.assign(req.body, {complete: false, referee: referees}));
  disputeAdd.save((err, disputeAdd) => {
    if(err) console.log(err);
    res.status = 200;
  })
});

app.get('/dispute/all', (req, res) => {
  disputeModel.find({}).populate('referee').exec((err, dispute) => {
    if(err) console.log(err);
    let result = JSON.stringify(dispute);
    console.log(result);
    res.json(result);
  });
});
