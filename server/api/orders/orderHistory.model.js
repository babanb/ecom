'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;


var OrderHistorySchema = new Schema({
 	orderID: {
      type: String, ref: 'Orders',
      required: true
    },
    createdDate: {
      type: Date,
      required: true
    },
    orderStatus: {
      type: Number, ref: 'OrderStatus' 
    },
    remarks: {
      type: String
    },
    updatedDate: {
      type: Date
    },
    _id: {type:Number,  default: 1, unique:true}

}, { _id: false });


module.exports = mongoose.model('OrderHistory', OrderHistorySchema);
OrderHistorySchema.plugin(AutoIncrement.plugin, 'OrderHistory');
