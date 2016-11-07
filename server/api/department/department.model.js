'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var DepartmentSchema = new Schema({
  name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    isActive: {
      type: Boolean,
      required: true
    }
});

module.exports = mongoose.model('Department', DepartmentSchema);
