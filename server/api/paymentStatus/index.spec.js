'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var paymentStatusCtrlStub = {
  index: 'paymentStatusCtrl.index',
  show: 'paymentStatusCtrl.show',
  create: 'paymentStatusCtrl.create',
  update: 'paymentStatusCtrl.update',
  destroy: 'paymentStatusCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var paymentStatusIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './paymentStatus.controller': paymentStatusCtrlStub
});

describe('PaymentStatus API Router:', function() {

  it('should return an express router instance', function() {
    paymentStatusIndex.should.equal(routerStub);
  });

  describe('GET /api/paymentStatus', function() {

    it('should route to paymentStatus.controller.index', function() {
      routerStub.get
        .withArgs('/', 'paymentStatusCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/paymentStatus/:id', function() {

    it('should route to paymentStatus.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'paymentStatusCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/paymentStatus', function() {

    it('should route to paymentStatus.controller.create', function() {
      routerStub.post
        .withArgs('/', 'paymentStatusCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/paymentStatus/:id', function() {

    it('should route to paymentStatus.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'paymentStatusCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/paymentStatus/:id', function() {

    it('should route to paymentStatus.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'paymentStatusCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/paymentStatus/:id', function() {

    it('should route to paymentStatus.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'paymentStatusCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
