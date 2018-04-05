'use_strict';

var express = require('express');
var app = express();
var user = require('./routes/user.js');


app.use('/', express.static('static'));
app.use('/resources', express.static('node_modules/openui5.runtime.downloader/lib/resources'));
app.use('/user', user);

app.listen(10000, function () {
    console.log('OpenUI5 on NodeJS example app is listening on port 10000!');
});