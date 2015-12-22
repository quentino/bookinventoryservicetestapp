var request = require('supertest');
var app = require('../app')

describe('GET /', function(){
  it('Respond with json', function(done){
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

describe('POST /stock', function(){
  it('Respond with json', function(done){
    request(app)
      .post('/stock')
      .set('Accept', 'application/json')
      .field("isbn", "1")
      .field("count", "2")
      .expect('Content-Type', /json/)
      .expect(function(res) {
        res.body.isbn = '1';
        res.body.count = '2';
      })
      .expect(200, done);
    });
});
