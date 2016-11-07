'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var navigationMenuCtrlStub = {
  index: 'navigationMenuCtrl.index',
  show: 'navigationMenuCtrl.show',
  create: 'navigationMenuCtrl.create',
  update: 'navigationMenuCtrl.update',
  destroy: 'navigationMenuCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var navigationMenuIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './navigationMenu.controller': navigationMenuCtrlStub
});

describe('NavigationMenu API Router:', function() {

  it('should return an express router instance', function() {
    navigationMenuIndex.should.equal(routerStub);
  });

  describe('GET /api/menus', function() {

    it('should route to navigationMenu.controller.index', function() {
      routerStub.get
        .withArgs('/', 'navigationMenuCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/menus/:id', function() {

    it('should route to navigationMenu.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'navigationMenuCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/menus', function() {

    it('should route to navigationMenu.controller.create', function() {
      routerStub.post
        .withArgs('/', 'navigationMenuCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/menus/:id', function() {

    it('should route to navigationMenu.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'navigationMenuCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/menus/:id', function() {

    it('should route to navigationMenu.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'navigationMenuCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/menus/:id', function() {

    it('should route to navigationMenu.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'navigationMenuCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
