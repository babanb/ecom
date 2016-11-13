'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

var AutocompleteSearchSchema = new Schema({
    _id: {type:Number,  default: 1, unique:true},
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
}, { _id: false });

module.exports = mongoose.model('AutocompleteSearch', AutocompleteSearchSchema);
AutocompleteSearchSchema.plugin(AutoIncrement.plugin, 'AutocompleteSearch');