var express = require('express');
var bodyParser = require('body-parser');
// var db = require('../database/db');
// var Money = require('../database/money');
var app = express();

app.use(express.static(__dirname + '/../public'));

app.listen(3000, function() {
  console.log('listening on port 3000!');
});