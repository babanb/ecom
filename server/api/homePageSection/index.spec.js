'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var homePageSectionCtrlStub = {
  index: 'homePageSectionCtrl.index',
  show: 'homePageSectionCtrl.show',
  create: 'homePageSectionCtrl.create',
  update: 'homePageSectionCtrl.update',
  destroy: 'homePageSectionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var homePageSectionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './homePageSection.controller': homePageSectionCtrlStub
});

describe('HomePageSection API Router:', function() {

  it('should return an express router instance', function() {
    homePageSectionIndex.should.equal(routerStub);
  });

  describe('GET /api/homePageSections', function() {

    it('should route to homePageSection.controller.index', function() {
      routerStub.get
        .withArgs('/', 'homePageSectionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/homePageSections/:id', function() {

    it('should route to homePageSection.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'homePageSectionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/homePageSections', function() {

    it('should route to homePageSection.controller.create', function() {
      routerStub.post
        .withArgs('/', 'homePageSectionCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/homePageSections/:id', function() {

    it('should route to homePageSection.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'homePageSectionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/homePageSections/:id', function() {

    it('should route to homePageSection.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'homePageSectionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/homePageSections/:id', function() {

    it('should route to homePageSection.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'homePageSectionCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
