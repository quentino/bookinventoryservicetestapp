var request = require('supertest');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

function logRequest(req,res,next){
  console.log('New reuquest logged' + new Date());
  next();
}

app.use(logRequest);
app.use(bodyParser.json());

function clientError(req, res, next) {
  var err = new Error("NOT FOUND");
  err.status = 404;
  next(err);
}

function serverError(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: (process.env.NODE_ENV === 'production') ? {} : err
  });
}

app.post('/stock', function(req, res){
    res.json({
      "isbn"  : req.body.isbn,
      "count" : req.body.count
    });
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(clientError);
app.use(serverError);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

describe('GET /', function(){
  it('respond with json', function(done){
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });
});


//
//
// describe('POST /stock', function(){
//   it('respond with json', function(done){
//     request(app)
//       .post('/stock')
//       .set('Accept', 'application/json')
//       // .field("isbn", "1")
//       // .field("count", "2")
//       .expect('Content-Type', /json/)
//       .expect(function(res) {
//         res.body.isbn = '1';
//         res.body.count = '2';
//       })
//       .expect(200, done);
//
//
//     });
// })
