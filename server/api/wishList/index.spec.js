'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var wishListCtrlStub = {
  index: 'wishListCtrl.index',
  show: 'wishListCtrl.show',
  create: 'wishListCtrl.create',
  update: 'wishListCtrl.update',
  destroy: 'wishListCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var wishListIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './wishList.controller': wishListCtrlStub
});

describe('WishList API Router:', function() {

  it('should return an express router instance', function() {
    wishListIndex.should.equal(routerStub);
  });

  describe('GET /api/wishLists', function() {

    it('should route to wishList.controller.index', function() {
      routerStub.get
        .withArgs('/', 'wishListCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/wishLists/:id', function() {

    it('should route to wishList.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'wishListCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/wishLists', function() {

    it('should route to wishList.controller.create', function() {
      routerStub.post
        .withArgs('/', 'wishListCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/wishLists/:id', function() {

    it('should route to wishList.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'wishListCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/wishLists/:id', function() {

    it('should route to wishList.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'wishListCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/wishLists/:id', function() {

    it('should route to wishList.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'wishListCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
