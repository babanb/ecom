/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/products              ->  index
 * POST    /api/products              ->  create
 * GET     /api/products/:id          ->  show
 * PUT     /api/products/:id          ->  update
 * DELETE  /api/products/:id          ->  destroy
 */

'use strict';

var fs = require('fs');
var _ = require('lodash');
var Products = require('./products.model'); 
var prodSchema =require("mongoose").model("Products").schema;
var csvParser = require('csv-parse');
var Converter = require("csvtojson").Converter;
var converter = new Converter({});  

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

// Gets a list of Productss
exports.index = function(req, res) {
  Products.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Products from the DB
exports.show = function(req, res) {
  Products.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// search Products from the DB
exports.searchProducts = function(req, res) {
  Products.find( { $text : { $search : req.params.text } })
    .exec()
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Products in the DB
exports.create = function(req, res) {
  Products.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Products in the DB
exports.update = function(req, res) {
  
  if (req.body._id) {
    delete req.body._id;
  }
  
  Products.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Products from the DB
exports.destroy = function(req, res) {
  Products.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

exports.uploadCsv = function(req, res) {  

  fs.readFile(req.body.filePath, {
            encoding: 'utf-8'
        }, function(err, csvData) {
            if (err) {
                console.log(err);
            }
  
            csvParser(csvData, {
                delimiter: ',' 
            }, function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }); 
};

//end_parsed will be emitted once parsing finished 
converter.on("end_parsed", function (jsonArray) {   
        var prod = prodSchema.obj;
   if(jsonArray && jsonArray.length >0){
      for(var i=0; i<jsonArray.length; i++){
        var productObj ={}, 
            nonProductObj = {},
            obj = jsonArray[i];

        for(var prop in obj){
          if(prod.hasOwnProperty(prop)){
             productObj[prop] = obj[prop];
          } else {
             nonProductObj[prop] = obj[prop];
          }
        } 

        console.log(productObj); 
        
        Products.find({'vendorID' : 100}, function (err, count){ 
            console.log(count);
            if(count>0){
                console.log("document exists ");
            }else if(count == 0){
                console.log("document not exists ");
                productObj['Features'] = nonProductObj;
                Products.createAsync(productObj); 
            }
        }); 

        // Need to check if the product allredy exists then we have to deicide what to be done..
                                                                                                                                           
        

        // push the remaing obj to secoundry table with Product id linked
      }
   }


});
