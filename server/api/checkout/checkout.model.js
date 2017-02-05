'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);
var Schema = mongoose.Schema;

var CheckoutSchema = new Schema({
    paymentMethod: String,
    orderID: String,
    userID: String,
    billingAddress: String,
    transactionID: String,
    checksum: String,
    ammount: Number,
    currency: String,
    payer_info: Object,
    transactionDate: Date,
    status: String,
    payment_mode: String,
    create_time: Date,
    update_time: Date,
    active: Boolean
});

CheckoutSchema.plugin(AutoIncrement.plugin, {
    model: 'Checkout',
    field: '_id',
    startAt: 100
});
module.exports = mongoose.model('Checkout', CheckoutSchema);