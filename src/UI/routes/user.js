var express = require('express');
var app = express();
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');


var router = express.Router();
var session = require('express-session');
var sess;

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

// Express Session
 // app.use(session({
 //     secret: 'secret',
 //     saveUninitialized: true,
 //     resave: true
 // }));

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	sess = req.session;
	sess.username;
  console.log('Time: ', Date.now());

  next();
});
// define the user page route

 router.get('/*', function(req, res) {

   //console.log(req.params[0]);

   //console.log(JSON.parse(req.params[0]).name);

   //res.send(req.params);
   sess = req.session;

   sess.username = JSON.parse(req.params[0]).name;
   //sess.username =

   if(sess.username){

    res.redirect('/');
   //res.write(
   //	'<h1>Hello '+sess.username+'</h1>'
   //);
	}
	else{
		res.status(404);        // HTTP status 404: NotFound
  		res.send('Error de sesión');
	}

 });


module.exports = router;