var express = require('express');
var router = express.Router();


// Get Homepage
router.get('/sso/sf/inicio', ensureAuthenticatedInicio, function(req, res){
	res.render('index');
});


function ensureAuthenticatedInicio(req, res, next){
	if(req.isAuthenticated()){
    	//res.json(req.user);
    	res.redirect('http://localhost:10000/index.html?user='+JSON.stringify(req.user));
		//return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login/sf');
	}
}

module.exports = router;