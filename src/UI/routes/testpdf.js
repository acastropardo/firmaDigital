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
  	var url = "https://api19.sapsf.com/odata/v2/Attachment?$format=json&$top=1"
  	
  	
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
	console.log('upsert');


	var key = 'basic U0ZBUElAYWdyb3N1cGVyc0Q6UGhyMjAxOA==';
  	var url = "https://api19.sapsf.com/odata/v2/User?$format=json"
  	var acastro = "acastro";



		var body = {
			'__metadata' : 
				{
				'uri' : "https://api19.sapsf.com/odata/v2/Attachment('908L')",
				'type' : "SFOData.Attachment",
				'name'	: "SFOData.Attachment",
				}
			,
			'ownerId' : 'RCM_Undecided',
			'userId' : 'acastro',
			'moduleCategory' : 'offerletter',
			'fileContent'	: '',
			'viewable'		: 'true',
			'attachmentId'	: '908',
			'imageConvertInProgress' : 'false',
			'deprecable'	: 'false',
			'userId'		: '15106101',
			'documentEntityId'	: '191',
			'fileExtension'	: 'pdf',
			'module' 		: 'RECRUITING', 
			'documentEntityType'	: 'OFFER_LETTER',
			'deletable'		: 'true', 
			'documentCategory' :'OFFER_ATTACHMENT',
			'fileName'	: 'OfferLetter.pdf',
			'softDelete' : 'false',
			'searchable'	: 'false',

		}


		

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

});


module.exports = router;