'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

var ProductsSchema = new Schema({
    active: Boolean,
   	newOld: String,
	description: String,
    externalProductId: String,
    model: String,
    make: String,
    productSiteLaunchDate: Date,
    merchantReleaseDate: Date,
    restockDate: Date,
    quantity: Number,
    saleFromDate: Date,
    saleEndDate: Date,
    maxShipQty: Number,
    itemPackageQty: Number,
    numberOfItems: Number,
    isGiftwrapped: Boolean,
    isDiscontinuedByManufacturer: Boolean,
    isGiftMessaged: String,
    shippingWeight: String,
    shippingWeightUnitOfMeasure: String,
    weightUnitOfMeasure: String,
    length: String,
    width: String,
    height: String,
    point1: String,
    point2: String,
    point3: String,
    point4: String,
    point5: String,
    s3: String,
    s4: String,
    s5: String,
    p3: String,
    p4: String,
    s6: String,
    otherImageUrl: String,
    otherImageUrl1: String,
    otherImageUrl2: String,
    otherImageUrl3: String,
    otherImageUrl4: String,
    otherImageUrl5: String,
    otherImageUrl6: String,
    otherImageUrl7: String,
    otherImageUrl8: String,
    color: String,
    size: String,
    sizeMap: String,
    colorMap: String,
    discount: String,
    finalDiscount: String,
    spcialOffer: String,
    offer1: String,
    offer4: String,
    offerAmt: String,
    offerPrice: String,
    discountOnDiscount: String,
    brand: String,
    listPrice: String,
    mainImageUrl: String,
    name: String,
    p1: String,
    s1: String,
    s2: String,
    p2: String,
    salePrice: Number,
    sku: String,
    dept: String,
    cat: String,
    vendorID: String,
    instock: String,
    subCat: String,
    Features: Object,
    _id: {type:Number,  default: 1, unique:true},
}, { _id: false });

module.exports = mongoose.model('Products', ProductsSchema);
ProductsSchema.plugin(AutoIncrement.plugin, 'Products');