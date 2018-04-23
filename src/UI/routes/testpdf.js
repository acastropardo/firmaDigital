var express = require('express');
var app = express();

var router = express.Router();
var session = require('express-session');
var request = require('request');
const util = require('util')


//var querystring = require('querystring');
var http = require('http');


var sess;

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
 
localStorage.setItem('myFirstKey', 'myFirstValue');
//console.log(localStorage.getItem('myFirstKey'));


router.use(function timeLog(req, res, next) {
	sess = req.session;
	//sess.username;
  //console.log('Time: ', Date.now());

  next();
});

router.get('/', function(req, res){

	//console.log('/');

	var key = 'basic U0ZBUElAYWdyb3N1cGVyc0Q6UGhyMjAxOA==';
  	var url = "https://api19.sapsf.com/odata/v2/Attachment?$format=json&$filter=attachmentId eq '481' " ;
  	
  	
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
 

        var content = JSON.parse(body);

        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

		res.setHeader('Content-Type', 'application/pdf');
		//res.setHeader('Content-Length', content.d.results[0].fileSize);
        //res.setHeader('Content-disposition', 'attachment');
        //res.setHeader('Content-disposition', 'inline; filename=lectura.pdf' );
        //res.setHeader('Transfer-Encoding', 'chunked');
        
        //res.setHeader('','charset=binary')
        let buff = new Buffer(content.d.results[0].fileContent, 'base64');  
        let text = buff.toString('ascii');

        res.send(buff); 




    }


});

	



});


router.get('/upsert', function(req, res){
	
	var key = 'basic U0ZBUElAYWdyb3N1cGVyc0Q6UGhyMjAxOA==';
  	var url = "https://api19.sapsf.com/odata/v2/upsert?$format=json"
  	var acastro = "acastro";

  	
  	var fileCont;
  	var text;
  	var base;
  	var fs = require('fs')

	fs.readFile('./routes/test.pdf', function (err,data) {
  	if (err) {
    return console.log(err);
  		}
  	else{
  		
  		
  		let fileCont = new Buffer(data, 'binary');  
  		text = fileCont;
  		//console.log(data);
  		//fileCont = data;
  		let base = fileCont.toString('base64');

  		//console.log(data);





	var body =	{
	    "__metadata": {"uri": "Attachment"},
	    "deletable": false,
	    "deprecable": false,
	    "externalId": 0,
	    "fileName": "test.pdf",
	    "fileContent": base,
	    "imageConvertInProgress": false,
	    "module": "GENERIC_OBJECT",
	    "searchable": false,
	    "softDelete": false,
	    "userId": "acastro",
	    "viewable": false
	}

	console.log(body);
		

	//Lets configure and request

	//console.log(JSON.stringify(body));

	request({
    url: url, //URL to hit
    //qs: {from: 'example', time: +new Date()}, //Query string data
    method: 'POST', // specify the request type
    headers: { // speciyfy the headers
        'Authorization': 'Basic U0ZBUElAYWdyb3N1cGVyc0Q6UGhyMjAxOA==',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body) //Set the body as a string
}, function(error, response, body){
    if(error) {
        console.log(error);

    } else {
        //console.log(response.statusCode);
        //console.log(body);

        //var username = JSON.parse(body).username;
        //console.log(body.username);
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
    }


});








  	}

	});





});


module.exports = router;