'use strict';

var app = require('../..');
var request = require('supertest');

var newNavigationMenu;

describe('NavigationMenu API:', function() {

  describe('GET /api/menus', function() {
    var navigationMenus;

    beforeEach(function(done) {
      request(app)
        .get('/api/menus')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          navigationMenus = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      navigationMenus.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/menus', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/menus')
        .send({
          name: 'New NavigationMenu',
          info: 'This is the brand new navigationMenu!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newNavigationMenu = res.body;
          done();
        });
    });

    it('should respond with the newly created navigationMenu', function() {
      newNavigationMenu.name.should.equal('New NavigationMenu');
      newNavigationMenu.info.should.equal('This is the brand new navigationMenu!!!');
    });

  });

  describe('GET /api/menus/:id', function() {
    var navigationMenu;

    beforeEach(function(done) {
      request(app)
        .get('/api/menus/' + newNavigationMenu._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          navigationMenu = res.body;
          done();
        });
    });

    afterEach(function() {
      navigationMenu = {};
    });

    it('should respond with the requested navigationMenu', function() {
      navigationMenu.name.should.equal('New NavigationMenu');
      navigationMenu.info.should.equal('This is the brand new navigationMenu!!!');
    });

  });

  describe('PUT /api/menus/:id', function() {
    var updatedNavigationMenu

    beforeEach(function(done) {
      request(app)
        .put('/api/menus/' + newNavigationMenu._id) 
        
        .send({
          name: 'Updated NavigationMenu',
          info: 'This is the updated navigationMenu!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedNavigationMenu = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedNavigationMenu = {};
    });

    it('should respond with the updated navigationMenu', function() {
      updatedNavigationMenu.name.should.equal('Updated NavigationMenu');
      updatedNavigationMenu.info.should.equal('This is the updated navigationMenu!!!');
    });

  });

  describe('DELETE /api/menus/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/menus/' + newNavigationMenu._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when navigationMenu does not exist', function(done) {
      request(app)
        .delete('/api/menus/' + newNavigationMenu._id)
        
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
