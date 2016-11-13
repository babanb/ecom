'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

var OrderStatusSchema = new Schema({
  description: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    _id: {type:Number,  default: 1, unique:true},
}, { _id: false });


module.exports = mongoose.model('OrderStatus', OrderStatusSchema);
OrderStatusSchema.plugin(AutoIncrement.plugin, 'OrderStatus');