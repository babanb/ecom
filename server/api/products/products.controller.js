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
var request = require('request');
var XLSX = require('xlsx');
var _ = require('lodash');
var Promise = require('bluebird');
var Products = require('./products.model');
var Category = require('../category/category.model');
var ProductFilter = require('../productFilter/productFilter.model');
var ProductsProperties = require('../uploadProductsProperties/uploadProductsProperties.model');
var prodSchema = require("mongoose").model("Products").schema;
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
    var productData = {};
    Products.find({
            $text: {
                $search: req.params.text
            }
        })
        .exec()
        .then(handleEntityNotFound(res))
        .then(function(res1){
           productData.products= res1;
            var catArray = _.pluck(res1,'cat'); //create an array of tag values from the object array
            var mostCommonCat = _.chain(catArray).countBy().pairs().max(_.last).head().value();
            Category.find({name:mostCommonCat})
                .select({_id:1})
                .exec()
                .then(function(cat){
                        console.log(cat);
                    var filters=[];
                      ProductFilter.find({categoryID:cat[0]._id})
                        .exec()
                        .then(handleEntityNotFound(res))
                        .then(function(res2){
                     
                            var promises = [];
                             promises.push(
                                Products.aggregate({
                                         $match: {
                                            cat:mostCommonCat,
                                            "$and":[{'listPrice':{"$ne":""}},{'':{"$ne":"listPrice"}}]
                                            }
                                         }, 
                                        { "$group": { 
                                            "_id": null,
                                            "max": { "$max": "$listPrice" }, 
                                            "min": { "$min": "$listPrice" } 
                                            
                                        }
                                    })
                                    .exec()
                                    .then(handleEntityNotFound(res))
                                    .then(function(resPrice){               
                                      filters.push({label:'Price',filterOption:'listPrice',filters:resPrice, type:'range'});
                                  })
                            );

                            res2.forEach(function(field) {

                                var name = '$'+field.filterOption;
                                var condition1 = {}, condition2 = {}, f1= field.filterOption, selectedFilters={};
                                var query = {};
                                condition1[f1]={"$ne":""};
                                condition2[f1]={"$ne":null};
                                if(req.query[field.filterOption]){                                    
                                    selectedFilters[field.filterOption]=req.query[field.filterOption];
                                }

                                query[field.filterOption] = '$_id';
                                query['ItemCount'] = '$ItemCount';
                                console.log(name);
                                promises.push(
                                    Products.aggregate({
                                         $match: {
                                            cat:mostCommonCat,
                                            "$and":[condition1,condition2]
                                            }
                                         },{$group:{
                                            "_id":{$toLower:name},
                                            "ItemCount":{'$sum':1}
                                        }},
                                        {$group:{
                                            "_id":query
                                        }
                                    })
                                      .exec()
                                      .then(handleEntityNotFound(res))
                                      .then(function(res3){               
                                        filters.push({label:field.label,filterOption:field.filterOption,filters:res3, type:field.type, selectedFilters: selectedFilters});
                                      })          
                               );
                            }); 

                            Promise.all(promises)
                            .then(function() { 
                                productData.filters = filters;
                                return res.json(productData); })
                            .error(console.error);
                        })
                        .catch(handleError(res));
                });
        })
        .catch(handleError(res));
};

// search Products from the DB
exports.searchProductsByDeptNCatNScatNTerm = function(req, res) {
    var productData = {};
    Products.find({
            'dept': {'$regex': req.params.dept,$options:'i'},
            'cat': {'$regex': req.params.cat,$options:'i'},
            'subCat': {'$regex': req.params.subcat,$options:'i'},
            $text: {
                $search: req.params.term              
            }
        })
        .exec()
        .then(handleEntityNotFound(res))
        .then(function(res1){
           productData.products= res1;
            var catArray = _.pluck(res1,'cat'); //create an array of tag values from the object array
            var mostCommonCat = _.chain(catArray).countBy().pairs().max(_.last).head().value();
            Category.find({name:mostCommonCat})
                .select({_id:1})
                .exec()
                .then(function(cat){
                        console.log(cat);
                    var filters=[];
                      ProductFilter.find({categoryID:cat[0]._id})
                        .exec()
                        .then(handleEntityNotFound(res))
                        .then(function(res2){
                     
                            var promises = [];
                             promises.push(
                                Products.aggregate({
                                         $match: {
                                            cat:mostCommonCat,
                                            "$and":[{'listPrice':{"$ne":""}},{'':{"$ne":"listPrice"}}]
                                            }
                                         }, 
                                        { "$group": { 
                                            "_id": null,
                                            "max": { "$max": "$listPrice" }, 
                                            "min": { "$min": "$listPrice" } 
                                            
                                        }
                                    })
                                    .exec()
                                    .then(handleEntityNotFound(res))
                                    .then(function(resPrice){               
                                      filters.push({label:'Price',filterOption:'listPrice',filters:resPrice, type:'range'});
                                  })
                            );

                            res2.forEach(function(field) {

                                var name = '$'+field.filterOption;
                                var condition1 = {}, condition2 = {}, f1= field.filterOption, selectedFilters={};
                                var query = {};
                                condition1[f1]={"$ne":""};
                                condition2[f1]={"$ne":null};
                                if(req.query[field.filterOption]){                                    
                                    selectedFilters[field.filterOption]=req.query[field.filterOption];
                                }

                                query[field.filterOption] = '$_id';
                                query['ItemCount'] = '$ItemCount';
                                console.log(name);
                                promises.push(
                                    Products.aggregate({
                                         $match: {
                                            cat:mostCommonCat,
                                            "$and":[condition1,condition2]
                                            }
                                         },{$group:{
                                            "_id":{$toLower:name},
                                            "ItemCount":{'$sum':1}
                                        }},
                                        {$group:{
                                            "_id":query
                                        }
                                    })
                                      .exec()
                                      .then(handleEntityNotFound(res))
                                      .then(function(res3){               
                                        filters.push({label:field.label,filterOption:field.filterOption,filters:res3, type:field.type, selectedFilters: selectedFilters});
                                      })          
                               );
                            }); 

                            Promise.all(promises)
                            .then(function() { 
                                productData.filters = filters;
                                return res.json(productData); })
                            .error(console.error);
                        })
                        .catch(handleError(res));
                });
        })
        .catch(handleError(res));
};

// search Products from the DB
exports.searchProductsByDeptNCatNScat = function(req, res) {
    var productData = {};
    Products.find({
                'dept': {'$regex': req.params.dept,$options:'i'},
                'cat': {'$regex': req.params.cat,$options:'i'},
                'subCat': {'$regex': req.params.subcat,$options:'i'}
        })
        .exec()
        .then(handleEntityNotFound(res))
        .then(function(res1){
           productData.products= res1;
            var catArray = _.pluck(res1,'cat'); //create an array of tag values from the object array
            var mostCommonCat = _.chain(catArray).countBy().pairs().max(_.last).head().value();
            Category.find({name:mostCommonCat})
                .select({_id:1})
                .exec()
                .then(function(cat){
                        console.log(cat);
                    var filters=[];
                      ProductFilter.find({categoryID:cat[0]._id})
                        .exec()
                        .then(handleEntityNotFound(res))
                        .then(function(res2){
                     
                            var promises = [];
                             promises.push(
                                Products.aggregate({
                                         $match: {
                                            cat:mostCommonCat,
                                            "$and":[{'listPrice':{"$ne":""}},{'':{"$ne":"listPrice"}}]
                                            }
                                         }, 
                                        { "$group": { 
                                            "_id": null,
                                            "max": { "$max": "$listPrice" }, 
                                            "min": { "$min": "$listPrice" } 
                                            
                                        }
                                    })
                                    .exec()
                                    .then(handleEntityNotFound(res))
                                    .then(function(resPrice){               
                                      filters.push({label:'Price',filterOption:'listPrice',filters:resPrice, type:'range'});
                                  })
                            );

                            res2.forEach(function(field) {

                                var name = '$'+field.filterOption;
                                var condition1 = {}, condition2 = {}, f1= field.filterOption, selectedFilters={};
                                var query = {};
                                condition1[f1]={"$ne":""};
                                condition2[f1]={"$ne":null};
                                if(req.query[field.filterOption]){                                    
                                    selectedFilters[field.filterOption]=req.query[field.filterOption];
                                }

                                query[field.filterOption] = '$_id';
                                query['ItemCount'] = '$ItemCount';
                                console.log(name);
                                promises.push(
                                    Products.aggregate({
                                         $match: {
                                            cat:mostCommonCat,
                                            "$and":[condition1,condition2]
                                            }
                                         },{$group:{
                                            "_id":{$toLower:name},
                                            "ItemCount":{'$sum':1}
                                        }},
                                        {$group:{
                                            "_id":query
                                        }
                                    })
                                      .exec()
                                      .then(handleEntityNotFound(res))
                                      .then(function(res3){               
                                        filters.push({label:field.label,filterOption:field.filterOption,filters:res3, type:field.type, selectedFilters: selectedFilters});
                                      })          
                               );
                            }); 

                            Promise.all(promises)
                            .then(function() { 
                                productData.filters = filters;
                                return res.json(productData); })
                            .error(console.error);
                        })
                        .catch(handleError(res));
                });
        })
        .catch(handleError(res));
};

// search Products from the DB
exports.searchProductsByDeptNCat = function(req, res) {
    var productData = {};
    Products.find({
                'dept': {'$regex': req.params.dept,$options:'i'},
                'cat': {'$regex': req.params.cat,$options:'i'}
        })
        .exec()
        .then(handleEntityNotFound(res))
        .then(function(res1){
           productData.products= res1;
            var catArray = _.pluck(res1,'cat'); //create an array of tag values from the object array
            var mostCommonCat = _.chain(catArray).countBy().pairs().max(_.last).head().value();
            Category.find({name:mostCommonCat})
                .select({_id:1})
                .exec()
                .then(function(cat){
                        console.log(cat);
                    var filters=[];
                      ProductFilter.find({categoryID:cat[0]._id})
                        .exec()
                        .then(handleEntityNotFound(res))
                        .then(function(res2){
                     
                            var promises = [];
                             promises.push(
                                Products.aggregate({
                                         $match: {
                                            cat:mostCommonCat,
                                            "$and":[{'listPrice':{"$ne":""}},{'':{"$ne":"listPrice"}}]
                                            }
                                         }, 
                                        { "$group": { 
                                            "_id": null,
                                            "max": { "$max": "$listPrice" }, 
                                            "min": { "$min": "$listPrice" } 
                                            
                                        }
                                    })
                                    .exec()
                                    .then(handleEntityNotFound(res))
                                    .then(function(resPrice){               
                                      filters.push({label:'Price',filterOption:'listPrice',filters:resPrice, type:'range'});
                                  })
                            );

                            res2.forEach(function(field) {

                                var name = '$'+field.filterOption;
                                var condition1 = {}, condition2 = {}, f1= field.filterOption, selectedFilters={};
                                var query = {};
                                condition1[f1]={"$ne":""};
                                condition2[f1]={"$ne":null};
                                if(req.query[field.filterOption]){                                    
                                    selectedFilters[field.filterOption]=req.query[field.filterOption];
                                }

                                query[field.filterOption] = '$_id';
                                query['ItemCount'] = '$ItemCount';
                                console.log(name);
                                promises.push(
                                    Products.aggregate({
                                         $match: {
                                            cat:mostCommonCat,
                                            "$and":[condition1,condition2]
                                            }
                                         },{$group:{
                                            "_id":{$toLower:name},
                                            "ItemCount":{'$sum':1}
                                        }},
                                        {$group:{
                                            "_id":query
                                        }
                                    })
                                      .exec()
                                      .then(handleEntityNotFound(res))
                                      .then(function(res3){               
                                        filters.push({label:field.label,filterOption:field.filterOption,filters:res3, type:field.type, selectedFilters: selectedFilters});
                                      })          
                               );
                            }); 

                            Promise.all(promises)
                            .then(function() { 
                                productData.filters = filters;
                                return res.json(productData); })
                            .error(console.error);
                        })
                        .catch(handleError(res));
                });
        })
        .catch(handleError(res));
};




// search Products from the DB
exports.searchProductsByParams = function(req, res) {
    var query={}, page=0;
    for(var queryname in req.query){
        if(queryname!=='cat' && queryname !== 'q' && queryname !== 'page'){            
            var param = req.query[queryname].toString();
            var newparam = param.split(',');
             var regex = newparam.map(function (e) { return new RegExp(e, "i"); });
             query[queryname]={$in: regex};
        }
    }

    if(req.query.hasOwnProperty('cat') && req.query['cat']!=='All'){
        query['cat']={'$regex': req.query.cat,$options:'i'};
    }
    
    if(req.params.cat!=='All'){
        query['cat']={'$regex': req.params.cat,$options:'i'};
    }

    if(req.query.hasOwnProperty('q')){
        query['$text']={$search: req.query.q};
    }

    if(req.query.hasOwnProperty('page')){
        page= req.query.page
    }

    var productData = {};
    Products.find(query)
        .skip(parseInt(page)).limit(5)
        .exec()
        .then(handleEntityNotFound(res))
        .then(function(res1){
            //console.log(res1);
           productData.products= res1;
            var catArray = _.pluck(res1,'cat'); //create an array of tag values from the object array
            var mostCommonCat = _.chain(catArray).countBy().pairs().max(_.last).head().value();
            Category.find({name:mostCommonCat})
                .select({_id:1})
                .exec()
                .then(function(cat){
                        console.log(cat);
                    var filters=[];
                      ProductFilter.find({categoryID:cat[0]._id})
                        .exec()
                        .then(handleEntityNotFound(res))
                        .then(function(res2){
                     
                            var promises = [];
                             promises.push(
                                Products.aggregate({
                                         $match: {
                                            cat:mostCommonCat,
                                            "$and":[{'listPrice':{"$ne":""}},{'':{"$ne":"listPrice"}}]
                                            }
                                         }, 
                                        { "$group": { 
                                            "_id": null,
                                            "max": { "$max": "$listPrice" }, 
                                            "min": { "$min": "$listPrice" } 
                                            
                                        }
                                    })
                                    .exec()
                                    .then(handleEntityNotFound(res))
                                    .then(function(resPrice){               
                                      filters.push({label:'Price',filterOption:'listPrice',filters:resPrice, type:'range'});
                                  })
                            );

                            res2.forEach(function(field) {

                                var name = '$'+field.filterOption;
                                var condition1 = {}, condition2 = {}, f1= field.filterOption, selectedFilters={};
                                var query = {};
                                condition1[f1]={"$ne":""};
                                condition2[f1]={"$ne":null};
                                if(req.query[field.filterOption]){                                    
                                    selectedFilters[field.filterOption]=req.query[field.filterOption];
                                }

                                query[field.filterOption] = '$_id';
                                query['ItemCount'] = '$ItemCount';
                                console.log(name);
                                promises.push(
                                    Products.aggregate({
                                         $match: {
                                            cat:mostCommonCat,
                                            "$and":[condition1,condition2]
                                            }
                                         },{$group:{
                                            "_id":{$toLower:name},
                                            "ItemCount":{'$sum':1}
                                        }},
                                        {$group:{
                                            "_id":query
                                        }
                                    })
                                      .exec()
                                      .then(handleEntityNotFound(res))
                                      .then(function(res3){               
                                        filters.push({label:field.label,filterOption:field.filterOption,filters:res3, type:field.type, selectedFilters: selectedFilters});
                                      })          
                               );
                            }); 

                            Promise.all(promises)
                            .then(function() { 
                                productData.filters = filters;
                                return res.json(productData); })
                            .error(console.error);
                        })
                        .catch(handleError(res));
                });
        })
        .catch(handleError(res));
};


// search Products from the DB
exports.searchProductsByParamsDeptNCat = function(req, res) {
    var query={}, page=0;
    for(var queryname in req.query){
        if(queryname!=='cat' && queryname !== 'q' && queryname !== 'page'){            
            var param = req.query[queryname].toString();
            var newparam = param.split(',');
             var regex = newparam.map(function (e) { return new RegExp(e, "i"); });
             query[queryname]={$in: regex};
        }
    }

    if(req.query.hasOwnProperty('cat') && req.query['cat']!=='All'){
        query['cat']={'$regex': req.query.cat,$options:'i'};
    }
    
    if(req.query.hasOwnProperty('q')){
        query['$text']={$search: req.query.q};
    }

    if(req.query.hasOwnProperty('page')){
        page= req.query.page
    }

    query['dept'] = {'$regex': req.params.dept,$options:'i'};
    query['cat'] = {'$regex': req.params.cat,$options:'i'};

    var productData = {};
    Products.find(query)
        .skip(parseInt(page)).limit(5)
        .exec()
        .then(handleEntityNotFound(res))
        .then(function(res1){
           productData.products= res1;
            var catArray = _.pluck(res1,'cat'); //create an array of tag values from the object array
            var mostCommonCat = _.chain(catArray).countBy().pairs().max(_.last).head().value();
            Category.find({name:mostCommonCat})
                .select({_id:1})
                .exec()
                .then(function(cat){
                        console.log(cat);
                    var filters=[];
                      ProductFilter.find({categoryID:cat[0]._id})
                        .exec()
                        .then(handleEntityNotFound(res))
                        .then(function(res2){
                     
                            var promises = [];
                             promises.push(
                                Products.aggregate({
                                         $match: {
                                            cat:mostCommonCat,
                                            "$and":[{'listPrice':{"$ne":""}},{'':{"$ne":"listPrice"}}]
                                            }
                                         }, 
                                        { "$group": { 
                                            "_id": null,
                                            "max": { "$max": "$listPrice" }, 
                                            "min": { "$min": "$listPrice" } 
                                            
                                        }
                                    })
                                    .exec()
                                    .then(handleEntityNotFound(res))
                                    .then(function(resPrice){               
                                      filters.push({label:'Price',filterOption:'listPrice',filters:resPrice, type:'range'});
                                  })
                            );

                            res2.forEach(function(field) {

                                var name = '$'+field.filterOption;
                                var condition1 = {}, condition2 = {}, f1= field.filterOption, selectedFilters={};
                                var query = {};
                                condition1[f1]={"$ne":""};
                                condition2[f1]={"$ne":null};
                                if(req.query[field.filterOption]){                                    
                                    selectedFilters[field.filterOption]=req.query[field.filterOption];
                                }

                                query[field.filterOption] = '$_id';
                                query['ItemCount'] = '$ItemCount';
                                console.log(name);
                                promises.push(
                                    Products.aggregate({
                                         $match: {
                                            cat:mostCommonCat,
                                            "$and":[condition1,condition2]
                                            }
                                         },{$group:{
                                            "_id":{$toLower:name},
                                            "ItemCount":{'$sum':1}
                                        }},
                                        {$group:{
                                            "_id":query
                                        }
                                    })
                                      .exec()
                                      .then(handleEntityNotFound(res))
                                      .then(function(res3){               
                                        filters.push({label:field.label,filterOption:field.filterOption,filters:res3, type:field.type, selectedFilters: selectedFilters});
                                      })          
                               );
                            }); 

                            Promise.all(promises)
                            .then(function() { 
                                productData.filters = filters;
                                return res.json(productData); })
                            .error(console.error);
                        })
                        .catch(handleError(res));
                });
        })
        .catch(handleError(res));
};


// search Products from the DB
exports.searchProductsByParamsDeptNCatNScat = function(req, res) {
    var query={}, page=0;
    for(var queryname in req.query){
        if(queryname!=='cat' && queryname !== 'q' && queryname !== 'page'){            
            var param = req.query[queryname].toString();
            var newparam = param.split(',');
             var regex = newparam.map(function (e) { return new RegExp(e, "i"); });
             query[queryname]={$in: regex};
        }
    }

    if(req.query.hasOwnProperty('cat') && req.query['cat']!=='All'){
        query['cat']={'$regex': req.query.cat,$options:'i'};
    }
    
    if(req.query.hasOwnProperty('q')){
        query['$text']={$search: req.query.q};
    }

    if(req.query.hasOwnProperty('page')){
        page= req.query.page
    }

    query['dept'] = {'$regex': req.params.dept,$options:'i'};
    query['cat'] = {'$regex': req.params.cat,$options:'i'};
    query['subCat'] = {'$regex': req.params.subcat,$options:'i'};

    var productData = {};
    Products.find(query)
        .skip(parseInt(page)).limit(5)
        .exec()
        .then(handleEntityNotFound(res))
        .then(function(res1){
           productData.products= res1;
            var catArray = _.pluck(res1,'cat'); //create an array of tag values from the object array
            var mostCommonCat = _.chain(catArray).countBy().pairs().max(_.last).head().value();
            Category.find({name:mostCommonCat})
                .select({_id:1})
                .exec()
                .then(function(cat){
                        console.log(cat);
                    var filters=[];
                      ProductFilter.find({categoryID:cat[0]._id})
                        .exec()
                        .then(handleEntityNotFound(res))
                        .then(function(res2){
                     
                            var promises = [];
                             promises.push(
                                Products.aggregate({
                                         $match: {
                                            cat:mostCommonCat,
                                            "$and":[{'listPrice':{"$ne":""}},{'':{"$ne":"listPrice"}}]
                                            }
                                         }, 
                                        { "$group": { 
                                            "_id": null,
                                            "max": { "$max": "$listPrice" }, 
                                            "min": { "$min": "$listPrice" } 
                                            
                                        }
                                    })
                                    .exec()
                                    .then(handleEntityNotFound(res))
                                    .then(function(resPrice){               
                                      filters.push({label:'Price',filterOption:'listPrice',filters:resPrice, type:'range'});
                                  })
                            );

                            res2.forEach(function(field) {

                                var name = '$'+field.filterOption;
                                var condition1 = {}, condition2 = {}, f1= field.filterOption, selectedFilters={};
                                var query = {};
                                condition1[f1]={"$ne":""};
                                condition2[f1]={"$ne":null};
                                if(req.query[field.filterOption]){                                    
                                    selectedFilters[field.filterOption]=req.query[field.filterOption];
                                }

                                query[field.filterOption] = '$_id';
                                query['ItemCount'] = '$ItemCount';
                                console.log(name);
                                promises.push(
                                    Products.aggregate({
                                         $match: {
                                            cat:mostCommonCat,
                                            "$and":[condition1,condition2]
                                            }
                                         },{$group:{
                                            "_id":{$toLower:name},
                                            "ItemCount":{'$sum':1}
                                        }},
                                        {$group:{
                                            "_id":query
                                        }
                                    })
                                      .exec()
                                      .then(handleEntityNotFound(res))
                                      .then(function(res3){               
                                        filters.push({label:field.label,filterOption:field.filterOption,filters:res3, type:field.type, selectedFilters: selectedFilters});
                                      })          
                               );
                            }); 

                            Promise.all(promises)
                            .then(function() { 
                                productData.filters = filters;
                                return res.json(productData); })
                            .error(console.error);
                        })
                        .catch(handleError(res));
                });
        })
        .catch(handleError(res));
};


// search Products from the DB
exports.searchProductsByParamsDeptNCatNScatNTerm = function(req, res) {
    //console.log(req.query);
    var productData = {};
    Products.find({
            'dept': {'$regex': req.params.dept,$options:'i'},
            'cat': {'$regex': req.params.cat,$options:'i'},
            'subCat': {'$regex': req.params.subcat,$options:'i'},
            $text: {
                $search: req.params.term              
            }
        })
        .exec()
        .then(handleEntityNotFound(res))
        .then(function(res1){
           productData.products= res1;
            var catArray = _.pluck(res1,'cat'); //create an array of tag values from the object array
            var mostCommonCat = _.chain(catArray).countBy().pairs().max(_.last).head().value();
            Category.find({name:mostCommonCat})
                .select({_id:1})
                .exec()
                .then(function(cat){
                        console.log(cat);
                    var filters=[];
                      ProductFilter.find({categoryID:cat[0]._id})
                        .exec()
                        .then(handleEntityNotFound(res))
                        .then(function(res2){
                     
                            var promises = [];

                            res2.forEach(function(field) {

                                var name = '$'+field.filterOption;
                                var condition1 = {}, condition2 = {}, f1= field.filterOption, selectedFilters={};
                                var query = {};
                                condition1[f1]={"$ne":""};
                                condition2[f1]={"$ne":null};
                                if(req.query[field.filterOption]){                                    
                                    selectedFilters[field.filterOption]=req.query[field.filterOption];
                                }

                                query[field.filterOption] = '$_id';
                                query['ItemCount'] = '$ItemCount';
                                console.log(name);
                                promises.push(
                                    Products.aggregate({
                                         $match: {
                                            cat:mostCommonCat,
                                            "$and":[condition1,condition2]
                                            }
                                         },{$group:{
                                            "_id":{$toLower:name},
                                            "ItemCount":{'$sum':1}
                                        }},
                                        {$group:{
                                            "_id":query
                                        }
                                    })
                                      .exec()
                                      .then(handleEntityNotFound(res))
                                      .then(function(res3){               
                                        filters.push({label:field.label,filterOption:field.filterOption,filters:res3, type:field.type, selectedFilters: selectedFilters});
                                      })          
                               );
                            }); 

                            Promise.all(promises)
                            .then(function() { 
                                productData.filters = filters;
                                return res.json(productData); })
                            .error(console.error);
                        })
                        .catch(handleError(res));
                });
        })
        .catch(handleError(res));
};

// search Products from the DB
exports.getproduct_filters = function(req, res) {
    var minPrice = 0, maxPrice=0,categories=[];
    Products.find({
            $text: {
                $search: req.params.text
            }
        },{'salePrice':1})
        .sort({'salePrice':-1})
        .limit(1)
        .exec()
        .then(handleEntityNotFound(res))
        .then(function(res1){
            maxPrice=res1[0].salePrice;
            console.log(res1[0].salePrice);
            Products.find({
            $text: {
                $search: req.params.text
                }
            },{'salePrice':1})
            .sort({'salePrice':1})
            .limit(1)
            .exec()
            .then(handleEntityNotFound(res))
            .then(function(res2){
                minPrice=res2[0].salePrice;


                Products.aggregate({
                    $match: {
                        $text:{ $search: req.params.text}
                    }
                },{$group:{
                    "_id":{$toLower:'$cat'},
                    "ItemCount":{'$sum':1}
                }},
                {$group:{
                    "_id":{'Cat':'$_id',
                    "ItemCount":'$ItemCount'}
                }
                })
                .exec()
                .then(handleEntityNotFound(res))
                .then(function(response){
                    categories=response;
                     res.json({categories:categories,maxPrice:maxPrice,minPrice:minPrice});
                    
                })
                .catch(handleError(res));

            })
            .catch(handleError(res));

        })
        .catch(handleError(res));
};

// search Products from the DB
exports.searchProductsByCategory = function(req, res) {
    Products.find({
            cat: req.params.category
        })
        .exec()
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// search Products from the DB
exports.searchProductsByDepartment = function(req, res) {
    Products.find({
            dept: req.params.dept
        })
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

// Creates a new Products in the DB
exports.updateAutocomplete = function(req, res) {
    //   Products.mapReduce(
    //     function() {
    //     var document = this;
    //     var stopwords = ["the","this","and","or"];
    //     var fields = ["name","make","description","s1","s2","s3","s4","s5","s6","brand","p1","p2","p3","p4","sku","dept","cat","subCat"];
    //     fields.forEach(
    //       function(field){
    //         var words = (document[field]).split(" ");
    //         words.forEach(
    //           function(word){
    //             var cleaned = word.replace(/[;,.]/g,"")
    //             if(
    //               (stopwords.indexOf(word)>-1) ||
    //               !(isNaN(parseInt(cleaned))) ||
    //               !(isNaN(parseFloat(cleaned))) ||
    //               cleaned.length < 2
    //             )
    //             {
    //               return
    //             }
    //               emit({'word':cleaned,'productID':document._id,'field':field},1)
    //           }
    //         )
    //       }
    //     )
    //   },
    //   function(key,values) {
    //     return _.sum(values);
    //   },
    //   {out: "searchtst" }
    // )

    var o = {};
    o.map = function() {
        var document = this;
        var stopwords = ["the", "this", "and", "or"];
        var fields = ["name", "s1", "s2", "s3", "brand", "p1", "p2", "sku", "dept", "cat", "subCat"];
        fields.forEach(
            function(field) {
                if(document[field]){
                    var words = (document[field]).split("");

                    // words.forEach(
                    //   function(word){
                    //     var cleaned = word.replace(/[;,.]/g,"")
                    //     if(
                    //       (stopwords.indexOf(word)>-1) ||
                    //       !(isNaN(parseInt(cleaned))) ||
                    //       !(isNaN(parseFloat(cleaned))) ||
                    //       cleaned.length < 2
                    //     )
                    //     {
                    //       return
                    //     }
                    //       emit({'word':cleaned,'productID':document._id,'field':field},1)
                    //   }
                    // )
                    emit({
                        'word': document[field],
                        'dept': document.dept,                    
                        'cat': document.cat,
                        'productID': document._id,
                        'field': field
                    }, 1)
                }
            }
        )
    }

    o.reduce = function(previous, current) {
        var count = 0;
        for (index in current) {
            count += current[index];
        }
        return count;
    }

    o.out = {
        replace: 'autocompletes'
    }
    o.verbose = true;


    Products.mapReduce(o, function(err, model, stats) {
        if (err) console.log(err);
        console.log('stats: ' + stats);
    });
    res.json({
        resilt: "success"
    });
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

function copyFile(source, target) {
    return new Promise(function(resolve, reject) {
        var rd = fs.createReadStream(source);
        rd.on('error', rejectCleanup);
        var wr = fs.createWriteStream(target);
        wr.on('error', rejectCleanup);
        function rejectCleanup(err) {
            rd.destroy();
            wr.end();
            reject(err);
        }
        wr.on('finish', resolve);
        rd.pipe(wr);
    });
}

function downloadImg(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var sendReq = request.get(url);

    // verify response code
    sendReq.on('response', function(response) {
        if (response.statusCode !== 200) {
            return cb('Response status was ' + response.statusCode);
        }
    });

    // check for request errors
    sendReq.on('error', function (err) {
        fs.unlink(dest);
        return cb(err.message);
    });

    sendReq.pipe(file);

    file.on('finish', function() {
        file.close(cb);  // close() is async, call cb after close completes.
    });

    file.on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        return cb(err.message);
    });
};

exports.uploadCsv = function(req, res) {

    var fstream, uploadPath = __dirname + '/../../../uploads/';
    var srcImagePath = __dirname + '/../../../uploads/product_images/';
    var destImagePath = __dirname + '/Users/gurujusmac/workspace/juskart_frontend_ng4/src/assets/product_images/';
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {
        console.log("Uploading: " + filename);

        //Path where image will be uploaded
        uploadPath += new Date().getTime() + '_' + filename;
        fstream = fs.createWriteStream(uploadPath);
        file.pipe(fstream);
        fstream.on('close', function() {
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
            for (var z in worksheet) {

                if (z[0] === '!') continue;
                //parse out the column, row, and value
                var col = z.replace(/[^a-z]/gi, '');
                var row = parseInt(z.replace(/^\D+/g, ''));
                var value = worksheet[z].v;
                //console.log('col='+col+'row='+row);
                //store header names
                if (row == 3) {
                    headers[col] = value.toLowerCase();
                    continue;
                }

                if (!data[row]) data[row] = {};
                data[row][headers[col]] = value;
            }
            //drop those first two rows which are empty
            data.shift();
            data.shift();

            var subcategory = _.chain(data).pluck('sub_category').unique().value();
            subcategory.push('Common');
            _.pull(subcategory, undefined);

            ProductsProperties.find({
                    subCategory: {
                        $in: subcategory
                    }
                })
                .then(function(properties) {


                    var prod = prodSchema.obj;
                    if (data && data.length > 0) {
                        for (var i = 2; i < data.length; i++) {
                            var productObj = {},
                                nonProductObj = {},
                                obj = data[i];

                            for (var prop in obj) {
                                prop=prop.toLowerCase();                                
                                var matchedFiled = properties.filter(function(value) {
                                    return value.fieldName.toLowerCase() == prop;
                                })
                                if (matchedFiled.length > 0) {
                                    //console.log('properties ='+prop);
                                    if(prop==='mainImageUrl'){

                                        if (validUrl.isUri(obj[prop])){
                                            console.log('Looks like an URI');
                                            var prod_name= obj.Product_Name.replace(/ /g,"_");
                                            var filename = prod_name+'_'+obj[prop].split('/').pop().split('#')[0].split('?')[0];
                                            
                                            downloadImg(obj[prop], destImagePath+filename)
                                        } 
                                        else {
                                            console.log('Not a URI');
                                            copyFile(srcImagePath+obj[prop],destImagePath+obj[prop]);
                                        }

                                    }
                                    console.log(prop, obj[prop]);
                                    productObj[matchedFiled[0].ProductMappingfield] = obj[prop];
                                } else {
                                    nonProductObj[prop] = obj[prop];
                                }
                            }

                            //console.log(productObj); 
                            productObj['Features'] = nonProductObj;
                            //console.log(productObj);
                            Products.findOneAndUpdate({
                                vendorID: productObj.vendorID,
                                subCat: productObj.subCat,
                                dept: productObj.dept,
                                name: productObj.name
                            }, productObj, {
                                upsert: true
                            }, function(err, doc) {
                                if (err) console.log(err);
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
converter.on("end_parsed", function(jsonArray) {
    var prod = prodSchema.obj;
    if (jsonArray && jsonArray.length > 0) {
        for (var i = 0; i < jsonArray.length; i++) {
            var productObj = {},
                nonProductObj = {},
                obj = jsonArray[i];

            for (var prop in obj) {
                if (prod.hasOwnProperty(prop)) {
                    productObj[prop] = obj[prop];
                } else {
                    nonProductObj[prop] = obj[prop];
                }
            }

            console.log(productObj);

            Products.find({
                'vendorID': 100
            }, function(err, count) {
                console.log(count);
                if (count > 0) {
                    console.log("document exists ");
                } else if (count == 0) {
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