var express = require('express');
var router = express.Router();
//var session = require('express-session');
//var app = express();

// Express Session
/*app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));*/

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the user page route

router.get('/', function(req, res) {
  res.send(req.session);
  res.send('Birds home page');
});

router.get('/user', function(req, res) {
  res.send(req.session);
  res.send('Birds home page');
});


module.exports = router;