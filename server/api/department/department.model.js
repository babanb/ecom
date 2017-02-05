'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

var DepartmentSchema = new Schema({

    _id: { type: Number, default: 1, unique: true },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    isActive: {
        type: Boolean,
        required: true
    }
}, { _id: false });

DepartmentSchema.plugin(AutoIncrement.plugin, {
    model: 'Department',
    field: '_id',
    startAt: 100
});
module.exports = mongoose.model('Department', DepartmentSchema);