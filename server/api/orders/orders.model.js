'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

var OrdersSchema = new Schema({

    productID: {
        type: Number,
        ref: 'Products',
        required: true
    },
    userID: {
        type: Number,
        ref: 'Users',
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
    paymentStatus: {
        required: true,
        type: String,
        enum: ['Completed', 'CanceledReversal', 'Denied', 'Expired', 'Failed', 'InProgress', 'Pending', 'Processed', 'Refunded', 'Reversed', 'Voided']
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
        type: Number,
        ref: 'PaymentMethod'
    },
    orderStatus: {
        type: Number,
        ref: 'OrderStatus'
    },
    address: {
        type: Number,
        ref: 'Adress',
        required: true
    },
    billingAddress: {
        type: Number,
        ref: 'Address',
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    orderHistory: {
        type: Number,
        ref: 'OrderHistory'
    },
    quantity: {
        type: Number,
        required: true
    },
    _id: { type: Number, default: 1, unique: true },
}, { _id: false });


OrdersSchema.plugin(AutoIncrement.plugin, {
    model: 'Orders',
    field: '_id',
    startAt: 100000
});

module.exports = mongoose.model('Orders', OrdersSchema);