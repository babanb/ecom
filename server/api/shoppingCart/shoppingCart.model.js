'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ShoppingCartSchema = new Schema({
  
    productID: {
      type: Schema.Types.ObjectId, ref: 'Products',
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
      type: Schema.Types.ObjectId, ref: 'Users'    
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
    }
});

module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema);
