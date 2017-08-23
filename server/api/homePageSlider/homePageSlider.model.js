'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);
var Schema = mongoose.Schema;

var HomePageSliderSchema = new Schema({
  name: String,
  description: String,
  searchKeyword:{ type: String, required: true },
  Category:{ type: Number, ref:'Category', required: true },
  Department:{ type: Number, ref: 'Department',required: true },
  SubCategory:{ type: Number, ref: "SubCategory"},
  fromDate:{ type: Date, required: true },
  toDate:{ type: Date, required: true },
  sliderImg: { type: String, required: true },	
  active: Boolean
});

HomePageSliderSchema.plugin(AutoIncrement.plugin, {
    model: 'SubCategory',
    field: '_id',
    startAt: 1
});
module.exports = mongoose.model('HomePageSlider', HomePageSliderSchema);
