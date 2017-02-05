'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');

AutoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

var SystemPropertySchema = new Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    tenantId: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        required: true
    },
    _id: { type: Number, default: 1, unique: true },
}, { _id: false });

SystemPropertySchema.plugin(AutoIncrement.plugin, {
    model: 'SystemProperty',
    field: '_id',
    startAt: 1
});
module.exports = mongoose.model('SystemProperty', SystemPropertySchema);