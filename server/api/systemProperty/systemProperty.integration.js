'use strict';

var app = require('../..');
var request = require('supertest');

var newSystemProperty;

describe('SystemProperty API:', function() {

  describe('GET /api/systemProperties', function() {
    var systemPropertys;

    beforeEach(function(done) {
      request(app)
        .get('/api/systemProperties')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          systemPropertys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      systemPropertys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/systemProperties', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/systemProperties')
        .send({
          name: 'New SystemProperty',
          info: 'This is the brand new systemProperty!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSystemProperty = res.body;
          done();
        });
    });

    it('should respond with the newly created systemProperty', function() {
      newSystemProperty.name.should.equal('New SystemProperty');
      newSystemProperty.info.should.equal('This is the brand new systemProperty!!!');
    });

  });

  describe('GET /api/systemProperties/:id', function() {
    var systemProperty;

    beforeEach(function(done) {
      request(app)
        .get('/api/systemProperties/' + newSystemProperty._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          systemProperty = res.body;
          done();
        });
    });

    afterEach(function() {
      systemProperty = {};
    });

    it('should respond with the requested systemProperty', function() {
      systemProperty.name.should.equal('New SystemProperty');
      systemProperty.info.should.equal('This is the brand new systemProperty!!!');
    });

  });

  describe('PUT /api/systemProperties/:id', function() {
    var updatedSystemProperty

    beforeEach(function(done) {
      request(app)
        .put('/api/systemProperties/' + newSystemProperty._id) 
        
        .send({
          name: 'Updated SystemProperty',
          info: 'This is the updated systemProperty!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSystemProperty = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSystemProperty = {};
    });

    it('should respond with the updated systemProperty', function() {
      updatedSystemProperty.name.should.equal('Updated SystemProperty');
      updatedSystemProperty.info.should.equal('This is the updated systemProperty!!!');
    });

  });

  describe('DELETE /api/systemProperties/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/systemProperties/' + newSystemProperty._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when systemProperty does not exist', function(done) {
      request(app)
        .delete('/api/systemProperties/' + newSystemProperty._id)
        
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
