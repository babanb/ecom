'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var homePageSectionItemsCtrlStub = {
  index: 'homePageSectionItemsCtrl.index',
  show: 'homePageSectionItemsCtrl.show',
  create: 'homePageSectionItemsCtrl.create',
  update: 'homePageSectionItemsCtrl.update',
  destroy: 'homePageSectionItemsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var homePageSectionItemsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './homePageSectionItems.controller': homePageSectionItemsCtrlStub
});

describe('HomePageSectionItems API Router:', function() {

  it('should return an express router instance', function() {
    homePageSectionItemsIndex.should.equal(routerStub);
  });

  describe('GET /api/homePageSectionItems', function() {

    it('should route to homePageSectionItems.controller.index', function() {
      routerStub.get
        .withArgs('/', 'homePageSectionItemsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/homePageSectionItems/:id', function() {

    it('should route to homePageSectionItems.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'homePageSectionItemsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/homePageSectionItems', function() {

    it('should route to homePageSectionItems.controller.create', function() {
      routerStub.post
        .withArgs('/', 'homePageSectionItemsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/homePageSectionItems/:id', function() {

    it('should route to homePageSectionItems.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'homePageSectionItemsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/homePageSectionItems/:id', function() {

    it('should route to homePageSectionItems.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'homePageSectionItemsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/homePageSectionItems/:id', function() {

    it('should route to homePageSectionItems.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'homePageSectionItemsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
