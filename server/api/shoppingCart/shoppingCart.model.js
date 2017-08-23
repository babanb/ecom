'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

var ShoppingCartSchema = new Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    createdDate: {
        type: Date
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
    UserID: {
        type: Number,
        ref: 'User'
    },
    sessionID: {
        type: String,
        required: true
    },
    authToken: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        required: true
    },
    updatedDate: {
        type: Date
    },
    _id: { type: Number, default: 1, unique: true },
}, { _id: false });

ShoppingCartSchema.plugin(AutoIncrement.plugin, {
    model: 'ShoppingCart',
    field: '_id',
    startAt: 1
});
module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema);