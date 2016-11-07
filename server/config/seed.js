/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Product from '../api/productMaster/productMaster.model'; 

Thing.find({}).removeAsync()
  .then(function() {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

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
    FeatureID: 1
    })
    .then(function() {
      console.log('finished populating Products');
    });
  });

