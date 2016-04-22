'use strict';

require('should');

var server = require('../../server');
var request = require('supertest');

describe('GET /api/award-disciplines', function () {

  it('should respond with JSON array', function (done) {
    request(server)
      .get('/api/award-disciplines')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) { return done(err); }
        res.body.should.be.instanceof(Array);
        done();
      });
  });

});
