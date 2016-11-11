'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var productReviewsCtrlStub = {
  index: 'productReviewsCtrl.index',
  show: 'productReviewsCtrl.show',
  create: 'productReviewsCtrl.create',
  update: 'productReviewsCtrl.update',
  destroy: 'productReviewsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var productReviewsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './productReviews.controller': productReviewsCtrlStub
});

describe('ProductReviews API Router:', function() {

  it('should return an express router instance', function() {
    productReviewsIndex.should.equal(routerStub);
  });

  describe('GET /api/productReviews', function() {

    it('should route to productReviews.controller.index', function() {
      routerStub.get
        .withArgs('/', 'productReviewsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/productReviews/:id', function() {

    it('should route to productReviews.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'productReviewsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/productReviews', function() {

    it('should route to productReviews.controller.create', function() {
      routerStub.post
        .withArgs('/', 'productReviewsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/productReviews/:id', function() {

    it('should route to productReviews.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'productReviewsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/productReviews/:id', function() {

    it('should route to productReviews.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'productReviewsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/productReviews/:id', function() {

    it('should route to productReviews.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'productReviewsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
