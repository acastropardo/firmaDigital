var express = require('express');
var app = express();

var router = express.Router();
var session = require('express-session');
var sess;


router.use(function timeLog(req, res, next) {
	sess = req.session;
	//sess.username;
  console.log('Time: ', Date.now());

  next();
});


 router.get('/', function(req, res) {

  res.send(sess);

 });




module.exports = router;