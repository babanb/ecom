/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/productFilters              ->  index
 * POST    /api/productFilters              ->  create
 * GET     /api/productFilters/:id          ->  show
 * PUT     /api/productFilters/:id          ->  update
 * DELETE  /api/productFilters/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var ProductFilter = require('./productFilter.model');
var Promise = require('bluebird');

var Products = require('../products/products.model');
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

// Gets a list of ProductFilters
exports.index = function(req, res) {
  ProductFilter.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single ProductFilter from the DB
exports.show = function(req, res) {
  ProductFilter.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single ProductFilter from the DB
exports.filrerbyCat = function(req, res) {
  var filters=[];
  ProductFilter.find({categoryID:req.params.id})  
    .populate('categoryID','name')
    .exec()
    .then(handleEntityNotFound(res))
    .then(function(res1){
 
 
        var promises = [];

        res1.forEach(function(field) {

            var name = field.filterOption;
            var query = {};
            query[name] = 1;
      promises.push(
            Products.find({cat:field.categoryID.name})
              .select(query)
              .exec()
              .then(handleEntityNotFound(res))
              .then(function(res2){               
                filters.push({label:field.label,filterOption:field.filterOption,filters:res2});
              })          
           );
        }); 

        Promise.all(promises)
        .then(function() { console.log('all dropped', filters); return res.json(filters); })
        .error(console.error);
    })
    .catch(handleError(res));
};

// Creates a new ProductFilter in the DB
exports.create = function(req, res) {
  ProductFilter.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing ProductFilter in the DB
exports.update = function(req, res) {
  
  if (req.body._id) {
    delete req.body._id;
  }
  
  ProductFilter.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a ProductFilter from the DB
exports.destroy = function(req, res) {
  ProductFilter.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
