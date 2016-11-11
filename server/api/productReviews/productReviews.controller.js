/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/productReviews              ->  index
 * POST    /api/productReviews              ->  create
 * GET     /api/productReviews/:id          ->  show
 * PUT     /api/productReviews/:id          ->  update
 * DELETE  /api/productReviews/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var ProductReviews = require('./productReviews.model');

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

// Gets a list of ProductReviewss
exports.index = function(req, res) {
  ProductReviews.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single ProductReviews from the DB
exports.show = function(req, res) {
  ProductReviews.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new ProductReviews in the DB
exports.create = function(req, res) {
  ProductReviews.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing ProductReviews in the DB
exports.update = function(req, res) {
  
  if (req.body._id) {
    delete req.body._id;
  }
  
  ProductReviews.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a ProductReviews from the DB
exports.destroy = function(req, res) {
  ProductReviews.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
