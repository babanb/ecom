'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var shoppingCartCtrlStub = {
  index: 'shoppingCartCtrl.index',
  show: 'shoppingCartCtrl.show',
  create: 'shoppingCartCtrl.create',
  update: 'shoppingCartCtrl.update',
  destroy: 'shoppingCartCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var shoppingCartIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './shoppingCart.controller': shoppingCartCtrlStub
});

describe('ShoppingCart API Router:', function() {

  it('should return an express router instance', function() {
    shoppingCartIndex.should.equal(routerStub);
  });

  describe('GET /api/shoppingCart', function() {

    it('should route to shoppingCart.controller.index', function() {
      routerStub.get
        .withArgs('/', 'shoppingCartCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/shoppingCart/:id', function() {

    it('should route to shoppingCart.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'shoppingCartCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/shoppingCart', function() {

    it('should route to shoppingCart.controller.create', function() {
      routerStub.post
        .withArgs('/', 'shoppingCartCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/shoppingCart/:id', function() {

    it('should route to shoppingCart.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'shoppingCartCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/shoppingCart/:id', function() {

    it('should route to shoppingCart.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'shoppingCartCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/shoppingCart/:id', function() {

    it('should route to shoppingCart.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'shoppingCartCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
