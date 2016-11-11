'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var paymentTypeCtrlStub = {
  index: 'paymentTypeCtrl.index',
  show: 'paymentTypeCtrl.show',
  create: 'paymentTypeCtrl.create',
  update: 'paymentTypeCtrl.update',
  destroy: 'paymentTypeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var paymentTypeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './paymentType.controller': paymentTypeCtrlStub
});

describe('PaymentType API Router:', function() {

  it('should return an express router instance', function() {
    paymentTypeIndex.should.equal(routerStub);
  });

  describe('GET /api/paymentTypes', function() {

    it('should route to paymentType.controller.index', function() {
      routerStub.get
        .withArgs('/', 'paymentTypeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/paymentTypes/:id', function() {

    it('should route to paymentType.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'paymentTypeCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/paymentTypes', function() {

    it('should route to paymentType.controller.create', function() {
      routerStub.post
        .withArgs('/', 'paymentTypeCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/paymentTypes/:id', function() {

    it('should route to paymentType.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'paymentTypeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/paymentTypes/:id', function() {

    it('should route to paymentType.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'paymentTypeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/paymentTypes/:id', function() {

    it('should route to paymentType.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'paymentTypeCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
