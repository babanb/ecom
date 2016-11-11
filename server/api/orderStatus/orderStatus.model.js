'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var OrderStatusSchema = new Schema({
  description: {
      type: String
    },
    name: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('OrderStatus', OrderStatusSchema);
