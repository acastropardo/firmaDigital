'use_strict';

var express = require('express');
var app = express();

var user = require('./routes/user.js');
var login = require('./routes/login.js');
var oDataEC = require('./routes/odataec.js');
var testPDF = require('./routes/testpdf.js');

var session = require('express-session');
var sess;


// Express Session
 app.use(session({
     secret: 'secret',
     saveUninitialized: true,
     resave: true
 }));


app.use('/', express.static('static'));
app.use('/resources', express.static('node_modules/openui5.runtime.downloader/lib/resources'));
app.use('/user', user);
app.use('/login', login);
app.use('/testpdf', testPDF);
app.use('/odataec', oDataEC);


app.listen(10000, function () {
    console.log('OpenUI5 on NodeJS example app is listening on port 10000!');
});