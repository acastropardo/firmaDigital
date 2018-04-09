var express = require('express');
var app = express();

var router = express.Router();
var session = require('express-session');
var sess;


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

   console.log(req.params[0]);

   console.log(JSON.parse(req.params[0]).name);

   //res.send(req.params);
   sess = req.session;
   sess.username = JSON.parse(req.params[0]).name;

   if(sess.username){

   res.write(
   	'<h1>Hello '+sess.username+'</h1>'
   	);
	}
	else{
		res.status(404);        // HTTP status 404: NotFound
  		res.send('Error de sesión');
	}

 });

// router.get('/test', function(req, res) {
//   //res.send(req.session);
//   res.send('Birds test page');
// });


module.exports = router;