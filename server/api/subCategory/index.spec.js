'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var subCategoryCtrlStub = {
  index: 'subCategoryCtrl.index',
  show: 'subCategoryCtrl.show',
  create: 'subCategoryCtrl.create',
  update: 'subCategoryCtrl.update',
  destroy: 'subCategoryCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var subCategoryIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './subCategory.controller': subCategoryCtrlStub
});

describe('SubCategory API Router:', function() {

  it('should return an express router instance', function() {
    subCategoryIndex.should.equal(routerStub);
  });

  describe('GET /api/subCategories', function() {

    it('should route to subCategory.controller.index', function() {
      routerStub.get
        .withArgs('/', 'subCategoryCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/subCategories/:id', function() {

    it('should route to subCategory.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'subCategoryCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/subCategories', function() {

    it('should route to subCategory.controller.create', function() {
      routerStub.post
        .withArgs('/', 'subCategoryCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/subCategories/:id', function() {

    it('should route to subCategory.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'subCategoryCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/subCategories/:id', function() {

    it('should route to subCategory.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'subCategoryCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/subCategories/:id', function() {

    it('should route to subCategory.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'subCategoryCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
