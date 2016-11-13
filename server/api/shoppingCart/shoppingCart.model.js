'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

var ShoppingCartSchema = new Schema({
  
    productID: {
      type: Number, ref: 'Products',
      required: true
    },
    createdDate: {
      type: Date,
      required: true
    },
    ipAddress: {
      type: String
    },
    area: {
      type: String
    },
    pinCode: {
      type: Number
    },
    quantity: {
      type: Number,
	  required: true
    },
    offerAmount: {
      type: String,
      required: true
    },
    salePrice: {
      type: String,
      required: true
    },
    UserID: {
      type: Number, ref: 'Users'    
    },
    sessionID: {
      type: String,
      required: true
    },
    sessionToken: {
      type: String,
      required: true
    },
    isDeleted:{
	  type: Boolean,
	  required: true	
    },
    updatedDate:{
    	type: Date
    },
    _id: {type:Number,  default: 1, unique:true},
}, { _id: false });

module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema);
ShoppingCartSchema.plugin(AutoIncrement.plugin, 'ShoppingCart');