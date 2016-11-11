'use strict';

var app = require('../..');
var request = require('supertest');

var newTodaysDeal;

describe('TodaysDeal API:', function() {

  describe('GET /api/todaysDeals', function() {
    var todaysDeals;

    beforeEach(function(done) {
      request(app)
        .get('/api/todaysDeals')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          todaysDeals = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      todaysDeals.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/todaysDeals', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/todaysDeals')
        .send({
          name: 'New TodaysDeal',
          info: 'This is the brand new todaysDeal!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newTodaysDeal = res.body;
          done();
        });
    });

    it('should respond with the newly created todaysDeal', function() {
      newTodaysDeal.name.should.equal('New TodaysDeal');
      newTodaysDeal.info.should.equal('This is the brand new todaysDeal!!!');
    });

  });

  describe('GET /api/todaysDeals/:id', function() {
    var todaysDeal;

    beforeEach(function(done) {
      request(app)
        .get('/api/todaysDeals/' + newTodaysDeal._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          todaysDeal = res.body;
          done();
        });
    });

    afterEach(function() {
      todaysDeal = {};
    });

    it('should respond with the requested todaysDeal', function() {
      todaysDeal.name.should.equal('New TodaysDeal');
      todaysDeal.info.should.equal('This is the brand new todaysDeal!!!');
    });

  });

  describe('PUT /api/todaysDeals/:id', function() {
    var updatedTodaysDeal

    beforeEach(function(done) {
      request(app)
        .put('/api/todaysDeals/' + newTodaysDeal._id) 
        
        .send({
          name: 'Updated TodaysDeal',
          info: 'This is the updated todaysDeal!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTodaysDeal = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTodaysDeal = {};
    });

    it('should respond with the updated todaysDeal', function() {
      updatedTodaysDeal.name.should.equal('Updated TodaysDeal');
      updatedTodaysDeal.info.should.equal('This is the updated todaysDeal!!!');
    });

  });

  describe('DELETE /api/todaysDeals/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/todaysDeals/' + newTodaysDeal._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when todaysDeal does not exist', function(done) {
      request(app)
        .delete('/api/todaysDeals/' + newTodaysDeal._id)
        
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
