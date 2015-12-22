var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();


var url = process.env.MONGO_LAB_URI || 'mongodb://heroku_4x78mgjj:5c76vmaot6lpjfdubl2k6f1qc4@ds033285.mongolab.com:33285/heroku_4x78mgjj';
var connection = MongoClient.connect(url);
var stockRepository = require('./stockRepository')(connection);
//var stockRepository = require('./inMemoryRepository');
var routes = require('./routes')(stockRepository);

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
