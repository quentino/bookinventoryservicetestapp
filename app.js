var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();

var url = process.env.MONGO_LAB_URI || 'mongodb://192.168.99.100:32770';
console.log(url);
var connection = MongoClient.connect(url);
var repository = require('./stockRepository')(connection);
//var repository = require('./inMemoryRepository');
var routes = require('./routes')(repository);

//console.log(process.env);

app.use(routes.logRequest);
app.use(bodyParser.json());


app.get('/', function (req, res) {
    routes.getHome(req, res);
});

app.post('/stock', function (req, res) {
    routes.updateOne(req, res);
});

app.get('/stock/:isbn', function (req, res) {
    routes.getCountByIsbn(req, res);
});

app.use(routes.clientError);
app.use(routes.serverError);

module.exports = app;
