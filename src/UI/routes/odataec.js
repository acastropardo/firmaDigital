var express = require('express');
var app = express();

var router = express.Router();
var session = require('express-session');
var request = require('request');


//var querystring = require('querystring');
var http = require('http');


var sess;


router.use(function timeLog(req, res, next) {
	sess = req.session;
	//sess.username;
  console.log('Time: ', Date.now());

  next();
});



  
router.get('/', function(req, res){

	var key = 'basic U0ZBUElAYWdyb3N1cGVyc0Q6UGhyMjAxOA==';
  	var url = "https://api19.sapsf.com/odata/v2/User('SFAPI')?$format=json"
  	
  	
//Lets configure and request
request({
    url: url, //URL to hit
    //qs: {from: 'example', time: +new Date()}, //Query string data
    method: 'GET', // specify the request type
    headers: { // speciyfy the headers
        'Authorization': 'Basic U0ZBUElAYWdyb3N1cGVyc0Q6UGhyMjAxOA==',
        'Custom-Header': 'Custom Value'
    },
    //body: 'Hello Hello! String body!' //Set the body as a string
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode);
        console.log(body);

        //var username = JSON.parse(body).username;
        //console.log(body.username);
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
    }


});

	



});


/*
var host = 'www.thegamecrafter.com';
var username = 'JonBob';
var password = '*****';
var apiKey = '*****';
var sessionId = null;
var deckId = '68DC5A20-EE4F-11E2-A00C-0858C0D5C2ED';

function performRequest(endpoint, method, data, success) {
  var dataString = JSON.stringify(data);
  var headers = {};
  
  if (method == 'GET') {
    endpoint += '?' + querystring.stringify(data);
  }
  else {
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length
    };
  }
  var options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      console.log(responseString);
      var responseObject = JSON.parse(responseString);
      success(responseObject);
    });
  });

  req.write(dataString);
  req.end();
}

*/
module.exports = router;