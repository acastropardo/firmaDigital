var express = require('express');
var app = express();

var router = express.Router();
var session = require('express-session');


// Express Session
 app.use(session({
     secret: 'secret',
     saveUninitialized: true,
     resave: true
 }));

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());

  next();
});
// define the user page route

 router.get('/*', function(req, res) {
   //res.send(req.session);
   //console.log(req.params.name);
   //res.send('Birds home page');
   console.log(req.params[0]);

   console.log(JSON.parse(req.params[0]).name);

   res.send(req.params);

 });

// router.get('/test', function(req, res) {
//   //res.send(req.session);
//   res.send('Birds test page');
// });


module.exports = router;