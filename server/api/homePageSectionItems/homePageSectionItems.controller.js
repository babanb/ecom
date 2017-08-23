/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/homePageSectionItems              ->  index
 * POST    /api/homePageSectionItems              ->  create
 * GET     /api/homePageSectionItems/:id          ->  show
 * PUT     /api/homePageSectionItems/:id          ->  update
 * DELETE  /api/homePageSectionItems/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var HomePageSectionItems = require('./homePageSectionItems.model');
var HomePageSection = require('../homePageSection/homePageSection.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of HomePageSectionItemss
exports.index = function(req, res) {

 var today = new Date();
  HomePageSection.find({"$and":[{"fromDate": {"$lte": today}}, {"toDate":{ "$gte": today}}]})
    .select({'_id':1})
    .exec()
    .then(function(response){
        HomePageSectionItems.find({"section":{'$in':response}})
        .populate('section')
        .populate('product')
        .exec()
        .then(responseWithResult(res))
        .catch(handleError(res));
    })
    .catch(handleError(res));

};

// Gets a single HomePageSectionItems from the DB
exports.show = function(req, res) {
  HomePageSectionItems.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new HomePageSectionItems in the DB
exports.create = function(req, res) {
  HomePageSectionItems.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing HomePageSectionItems in the DB
exports.update = function(req, res) {
  
  if (req.body._id) {
    delete req.body._id;
  }
  
  HomePageSectionItems.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a HomePageSectionItems from the DB
exports.destroy = function(req, res) {
  HomePageSectionItems.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
