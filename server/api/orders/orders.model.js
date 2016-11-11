'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var OrdersSchema = new Schema({

   orderID: {
      type: String,
      required: true,
      generated: true
    },
    productID: {
      type: Schema.Types.ObjectId, ref: 'Products',
      required: true
    },
    userID: {
		type: Schema.Types.ObjectId, ref: 'Users' ,
      	required: true
    },
    salePrice: {
      type: Number,
      required: true
    },
    offerPrice: {
      type: Number,
      required: true
    },
    trackingCode: {
      type: String
    },
    codCharges: {
      type: Number
    },
    orderAmount: {
      type: Number,
      required: true
    },
    shippingCharges: {
      type: Number
    },
    userRemarks: {
      type: String
    },
    paymentType: {
    	type: Schema.Types.ObjectId, ref: 'PaymentType',
      required: true 
	  },
    paymentStatus: { 
    	type: Schema.Types.ObjectId, ref: 'PaymentStatus' 
	  },
    referenceNumber: {
      type: String
    },
    checkSum: {
      type: String
    },
    couponCode: {
      type: String
    },
    ipAddress: {
      type: String
    },
    paymentMethod: {
      type: Schema.Types.ObjectId, ref: 'PaymentMethod' 
    },
    orderStatus: {
      type: Schema.Types.ObjectId, ref: 'OrderStatus' 
    },
    address: {
      type: Schema.Types.ObjectId, ref: 'Adress' ,
      required: true
    },
    billingAddress: {
      type: Schema.Types.ObjectId, ref: 'Address' ,
      required: true
    },
    orderDate: {
      type: Date,
      required: true
    },
    orderHistory: {
      type: Schema.Types.ObjectId, ref: 'OrderHistory',
      required: true
    },
    quantity: {
      type: Number,
      required: true
  	}

});

var OrderHistorySchema = new Schema({
 	orderID: {
      type: Schema.Types.ObjectId, ref: 'Orders',
      required: true
    },
    createdDate: {
      type: Date,
      required: true
    },
    orderStatus: {
      type: Schema.Types.ObjectId, ref: 'OrderStatus' 
    },
    remarks: {
      type: String
    },
    updatedDate: {
      type: Date
    }

});

module.exports = mongoose.model('Orders', OrdersSchema);

module.exports = mongoose.model('OrderHistory', OrderHistorySchema);
