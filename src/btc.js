var bcypher = require('blockcypher');

function btcHelper() {
  var bcapi = new bcypher('btc','test3','0693285e14654c4fafdeb2bc13e21ad1');

  var bitcoin = require("bitcoinjs-lib");
  var bigi    = require("bigi");
  var buffer  = require('buffer');

  this.newAddress = function (callback) {
    var data;
    bcapi.genAddr(data,function (error,body) {
        if(!error){
          callback?callback(body):null
        }else{
          callback?callback(error):null
        }
    });
  }

  this.addBTCtestnet = function (address,value,callback) {
    bcapi.faucet(address,value,function (error,body) {
      if(!error){
        callback?callback(body):null
      }else{
        callback?callback(error):null
      }
    });
  }

  this.getInfoAboutAddress = function (address,callback) {//тута транзакции лежат,но еще не придумал,как их доставать,наверное отдельный класс нужен будет.
    var params;
    bcapi.getAddrFull(address,params,function (error,body) {
      if(!error){
        callback?callback(body):null
      }else{
        callback?callback(error):null
      }
    });
  }
  
  this.getBalanceOfAddress =  function (address,callback){
    bcapi.getAddrBal(address,null,function (error,body) {
      if(!error){
        callback?callback(body):null
      }else{
        callback?callback(error):null
      }
    });
  }

  this.sendFullTX =  function (from,to,fromWIF,value,callback) { //from - array,to - array
    var network = bitcoin.networks.testnet;
    var keyPair = bitcoin.ECPair.fromWIF(wif,network)
    var newtx = {
      inputs: [{addresses: from}],
      outputs: [{addresses: to, value: value}]
    };
    bcapi.newTX(newtx,function (error,tmptx) {
      if(error) callback?callback(error):null;
      tmptx.pubkeys = [];
      tmptx.signatures = tmptx.tosign.map(function(tosign, n) {
        tmptx.pubkeys.push(keyPair.getPublicKeyBuffer().toString("hex"));
        return keyPair.sign(new buffer.Buffer(tosign, "hex")).toDER().toString("hex");
      });
      bcapi.sendTX(tmptx,function (error,body) {
        if(!error){
          callback?callback(body):null
        }else{
          callback?callback(error):null
        }
      });
    });
  }
}

var bitcoinHelper = new btcHelper();

module.exports = bitcoinHelper;
