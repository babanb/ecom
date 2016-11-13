'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;
autoIncrement.initialize(mongoose.connection);

var PaymentStatusSchema = new Schema({
  description: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    _id: {type:Number,  default: 1, unique:true},
}, { _id: false });

module.exports = mongoose.model('PaymentStatus', PaymentStatusSchema);

PaymentStatusSchema.plugin(autoIncrement.plugin, 'PaymentStatus');