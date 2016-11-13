/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Product from '../api/products/products.model'; 
import PaymentStatus from '../api/paymentStatus/paymentStatus.model'; 


User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(function() {
      console.log('finished populating users');
    });
  });
 


PaymentStatus.find({}).removeAsync()
  .then(function() {
    PaymentStatus.createAsync({
    name: "Completed",
    description: "Payment has been completed, and the funds have been added successfully to merchant's account balance.",
  },
  {
    name: "CanceledReversal",
    description: "A reversal has been canceled. For example, merchant won a dispute with the customer, and the funds for the transaction that was reversed have been returned to merchant.",
   
  },
  {
    name: "Denied",
    description: "When merchant denied the payment. This happens only if the payment was previously pending.",
   
  },
  {
    name: "Expired",
    description: "This authorization has expired and cannot be captured.",
   
  },
  {
    name: "Failed",
    description: "The payment has failed. This happens only if the payment was made from merchant customer's bank account.",
   
  },
  {
    name: "InProgress",
    description: "The transaction is in process of authorization and capture.",
   
  },
  {
    name: "Pending",
    description: "The payment is pending.",
   
  },
  {
    name: "Processed",
    description: "The payment has been accepted.",
   
  },
  {
    name: "Refunded",
    description: "The payment was refunded.",
   
  },
  {
    name: "Reversed",
    description: "The payment was reversed due to a chargeback or other type of reversal. The funds have been removed from merchant's account balance and returned to the buyer.",
   
  },
  {
    name: "Voided",
    description: "This authorization has been voided.",
   
  })
    .then(function() {
      console.log('finished populating PaymentStatus');
    });
  });

Product.find({}).removeAsync()
  .then(function() {
    Product.createAsync({
    active: true,
    newOld: 'new',
    description: 'test',
    externalProductId: 'abc12',
    model: 'abc123',
    make: 'test',
    productSiteLaunchDate: '12-12-2016',
    merchantReleaseDate: '12-12-2016',
    restockDate: '12-12-2016',
    quantity: 12,
    saleFromDate: '12-12-2016',
    saleEndDate: '12-12-2016',
    maxShipQty: 10,
    itemPackageQty: 1,
    numberOfItems: 1,
    isGiftwrapped: false,
    isDiscontinuedByManufacturer: false,
    isGiftMessaged: false,
    shippingWeight: '100',
    shippingWeightUnitOfMeasure: 'GM',
    weightUnitOfMeasure: 'GM',
    length: '10',
    width: '10',
    height: '10',
    point1: 'test point1',
    point2: 'test point2',
    point3: 'test point3',
    point4: 'test point4',
    point5: 'test point5',
    s3: 'test search1',
    s4: 'test search2',
    s5: 'test search3',
    p3: 'test p1',
    p4: 'test',
    s6: 'test',
    otherImageUrl: 'abc.jpg',
    otherImageUrl1: 'abc1.jpg',
    otherImageUrl2: 'abc2.jpg',
    otherImageUrl3: 'abc3.jpg',
    otherImageUrl4: 'abc4.jpg',
    otherImageUrl5: 'abc5.jpg',
    otherImageUrl6: 'abc6.jpg',
    otherImageUrl7: 'abc7.jpg',
    otherImageUrl8: 'abc8.jpg',
    color: 'black',
    size: 'xl',
    sizeMap: 'xl',
    colorMap: 'black',
    discount: '0',
    finalDiscount: '0',
    spcialOffer: '0',
    offer1: '0',
    offer4: '0',
    offerAmt: '0',
    offerPrice: '0',
    discountOnDiscount: '0',
    brand: 'test',
    listPrice: '100',
    mainImageUrl: 'abcd.jpg',
    name: 'abc',
    p1: 'test',
    s1: 'test',
    s2: 'test',
    p2: 'test',
    salePrice: 500,
    sku: 'abc12345',
    dept: 'Mens',
    cat: 'Clothing',
    vendorID: '100',
    instock: '12',
    subCat: 'Shirt',
    itemID: 122,
    FeatureID: {
      test:'test',
      test1:'test1',
      test2:'test2',
      test3:'test3',
    }
    })
    .then(function() {
      console.log('finished populating Products');
    });
  });

