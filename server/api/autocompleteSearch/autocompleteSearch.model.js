'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var AutocompleteSearchSchema = new Schema({
  
  	doc: {
      type: String
    },
    field: {
      type: String
    },
    category: {
      type: String
    },
    department: {
      type: String
    },
    word: {
      type: String,
      required: false
    }
});

module.exports = mongoose.model('AutocompleteSearch', AutocompleteSearchSchema);
