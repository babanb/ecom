'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var SubCategorySchema = new Schema({
   name: {
      type: String,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId, ref: 'Category',
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    }
});

module.exports = mongoose.model('SubCategory', SubCategorySchema);
