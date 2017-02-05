'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

var AddressSchema = new Schema({
    _id: { type: Number, default: 1, unique: true },
    name: {
        type: String,
        required: true
    },
    userID: {
        type: Number,
        ref: 'User',
        required: true
    },
    addressType: {
        type: String,
        enum: ['office', 'home', 'friends', 'others'],
        required: true
    },
    authToken: {
        required: true,
        type: String
    },
    street1: {
        type: String,
        required: true
    },
    street2: {
        type: String
    },
    street3: {
        type: String
    },
    street4: {
        type: String
    },
    companyName: {
        type: String
    },
    officeNumber: {
        type: Number
    },
    mobileNumber: {
        type: Number
    },
    landLineNumber: {
        type: Number
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        required: true
    }
}, { _id: false });

AddressSchema.plugin(AutoIncrement.plugin, {
    model: 'Address',
    field: '_id',
    startAt: 1
});
module.exports = mongoose.model('Address', AddressSchema);