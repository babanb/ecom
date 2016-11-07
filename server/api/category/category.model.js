'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
   name: {
      type: String,
      required: true
    },
    department: {
      type: Schema.Types.ObjectId, ref: 'department',
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    }
});

module.exports = mongoose.model('Category', CategorySchema);
