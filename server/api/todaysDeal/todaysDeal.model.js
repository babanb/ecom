'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

var TodaysDealSchema = new Schema({
  fromDate: {
      type: Date,
      required: true
    },
    toDate: {
      type: Date,
      required: true
    },
    toTime: {
      type: Date,
      required: true
    },
    fromTime: {
      type: Date,
      required: true
    },
    productID: {
      type: Number, ref: 'Products',
      required: true
    },
    _id: {type:Number,  default: 1, unique:true},
}, { _id: false });

module.exports = mongoose.model('TodaysDeal', TodaysDealSchema);
TodaysDealSchema.plugin(AutoIncrement.plugin, 'TodaysDeal');