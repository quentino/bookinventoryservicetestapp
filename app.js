var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();


var url = 'mongodb://192.168.99.100:32769/books';
var connection = MongoClient.connect(url);
//var stockRepository = require('./stockRepository')(connection);
var stockRepository = require('./inMemoryRepository');
var routes = require('./routes')(stockRepository);


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
