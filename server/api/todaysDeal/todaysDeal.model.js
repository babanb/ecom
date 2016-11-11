'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
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
      type: Schema.Types.ObjectId, ref: 'Products',
      required: true
    }
});

module.exports = mongoose.model('TodaysDeal', TodaysDealSchema);
