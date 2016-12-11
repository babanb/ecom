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
var fsextra = require('fs-extra');
var busboy = require('connect-busboy');
var validUrl = require('valid-url');
var XLSX = require('xlsx');
var _ = require('lodash');
var Products = require('./products.model'); 
var ProductsProperties = require('../uploadProductsProperties/uploadProductsProperties.model'); 
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

// search Products from the DB
exports.searchProductsByCategory = function(req, res) {
  Products.find({ cat: req.params.text})
    .exec()
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// search Products from the DB
exports.searchProductsByDepartment = function(req, res) {
  Products.find({ dept: req.params.text })
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

   var fstream, uploadPath=__dirname + '/../../../uploads/';
   req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            uploadPath += new Date().getTime()+'_'+filename;
            fstream = fs.createWriteStream(uploadPath);
            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + filename);              
               // res.redirect('back');           //where to go next

              
            // if(filename.split('.')[filename.split('.').length-1] === 'xlsx'){
            //     exceltojson = xlsxtojson;
            // } else {
            //     exceltojson = xlstojson;
            // }
           // try {
             var workbook = XLSX.readFile(uploadPath);


    var worksheet = workbook.Sheets['Template'];
    var headers = {};
    var data = [];
    for(var z in worksheet) {
      
        if(z[0] === '!') continue;
        //parse out the column, row, and value
        var col = z.replace(/[^a-z]/gi, '');
        var row = parseInt(z.replace( /^\D+/g, ''));
        var value = worksheet[z].v;
        //console.log('col='+col+'row='+row);
        //store header names
        if(row == 3) {
            headers[col] = value;
            continue;
        }

        if(!data[row]) data[row]={};
        data[row][headers[col]] = value;
    }
    //drop those first two rows which are empty
    data.shift();
    data.shift();

var subcategory = _.chain(data).pluck('sub_category').unique().value();
subcategory.push('Common');
_.pull(subcategory, undefined);

ProductsProperties.find({ subCategory: {$in: subcategory }})
    .then(function(properties){
     

       var prod = prodSchema.obj;
         if(data && data.length >0){
            for(var i=2; i<data.length; i++){
              var productObj ={}, 
                  nonProductObj = {},
                  obj = data[i];

              for(var prop in obj){
                var matchedFiled = properties.filter(function(value){ return value.fieldName==prop;})
                if(matchedFiled.length>0){
                  //console.log('properties ='+prop);
                  // if (validUrl.isUri(obj[prop])){
                  //     console.log('Looks like an URI');
                  // } 
                  // else {
                  //     console.log('Not a URI');
                  // }

                   productObj[matchedFiled[0].ProductMappingfield] = obj[prop];
                } else {
                   nonProductObj[prop] = obj[prop];
                }
              } 

              //console.log(productObj); 
              productObj['Features'] = nonProductObj;
              //console.log(productObj);
              Products.findOneAndUpdate({vendorID : productObj.vendorID,subCat:productObj.subCat,dept:productObj.dept,name:productObj.name},productObj,{upsert : true },function(err, doc){
                  if (err)  console.log(err);
                  //console.log("succesfully saved");
              });
              //console.log(productObj);
            }
        }


    });
 
    res.json(data);




              //var sheet_name_list = workbook.SheetNames;
             // res.json(XLSX.utils.sheet_to_json(workbook.Sheets['Template']));
            // } catch (e){
            //     res.json({error_code:1,err_desc:e});
            // }



              // fs.readFile(uploadPath, {
              //             encoding: 'utf-8'
              //   }, function(err, csvData) {
              //       if (err) {
              //           console.log(err);
              //       }
          
              //       csvParser(csvData, {
              //           delimiter: ',' 
              //       }, function(err, data) {
              //           if (err) {
              //               console.log(err);
              //           } else {
              //               console.log(data);
              //           }
              //       });
              //   }); 

            });
        });

//console.log('file path='+uploadPath);

  
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
