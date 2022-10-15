var createError = require('http-errors');
var express = require('express');
var path = require('path');

var app = express();

app.get(/^(.(?!.*\.css$|.*\.js|.*\.jpg))*$/, (req, res) => res.sendFile(path.join(__dirname + '/dist/index.html')));
app.use(express.static(__dirname + '/dist'));

module.exports = app;
