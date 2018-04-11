var express = require('express');
var app = express();

var router = express.Router();
var session = require('express-session');
var request = require('request');


//var querystring = require('querystring');
var http = require('http');


var sess;

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
 
localStorage.setItem('myFirstKey', 'myFirstValue');
console.log(localStorage.getItem('myFirstKey'));


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


router.get('/upsert', function(req, res){



	var key = 'basic U0ZBUElAYWdyb3N1cGVyc0Q6UGhyMjAxOA==';
  	var url = "https://api19.sapsf.com/odata/v2/User?$format=json"
  	var acastro = "acastro";


  		// Creando un ejemplo de JSON
		var session = {
		  'screens': [],
		  'state': true
		};

		session.screens.push({ 'name': 'screenA', 'width': 450, 'height': 250 });
		session.screens.push({ 'name': 'screenB', 'width': 650, 'height': 350 });
		session.screens.push({ 'name': 'screenC', 'width': 750, 'height': 120 });
		session.screens.push({ 'name': 'screenD', 'width': 250, 'height': 60 });
		session.screens.push({ 'name': 'screenE', 'width': 390, 'height': 120 });
		session.screens.push({ 'name': 'screenF', 'width': 1240, 'height': 650 });

		// Convirte el JSON string con JSON.stringify()
		// entonces guarda con localStorage con el nombre de la sesión
		localStorage.setItem('session', JSON.stringify(session));

		// Ejemplo de como transformar el String generado usando 
		// JSON.stringify() y guardándolo en localStorage como objeto JSON otra vez
		var restoredSession = JSON.parse(localStorage.getItem('session'));

		// Ahora la variable restoredSession contiene el objeto que fue guardado
		// en localStorage
		//console.log(restoredSession);


		var body = {
			'__metadata' : 
				{
				'uri' : "https://api19.sapsf.com/odata/v2/User('acastro')",
				'type' : "SFOData.User"
				}
			,
			'status' : 'Active',
			'userId' : 'acastro',
			'username' : 'acastropardo'
		}

	//Lets configure and request

	console.log(JSON.stringify(body));

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
        console.log(response.statusCode);
        console.log(body);

        //var username = JSON.parse(body).username;
        //console.log(body.username);
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
    }


});

});

module.exports = router;