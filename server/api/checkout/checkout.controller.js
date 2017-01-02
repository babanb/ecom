/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/checkout              ->  index
 * POST    /api/checkout              ->  create
 * GET     /api/checkout/:id          ->  show
 * PUT     /api/checkout/:id          ->  update
 * DELETE  /api/checkout/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Checkout = require('./checkout.model');
var ccavenue = require('ccavenue');
var paypal = require('paypal-rest-sdk');
var http = require("http");

var ShoppingCart = require('../shoppingCart/shoppingCart.model');
var orders = require('../orders/orders.model');
var ordersHistory = require('../orders/orderHistory.model');
var orderStatus = require('../orderStatus/orderStatus.model');
var commonFunctions = require('../../components/shared/commonFunctions');

var config = {
  "port" : 5000,
  "api" : {
    "host" : "api.sandbox.paypal.com",
    "port" : "",            
    "client_id" : "AdtfU6O03U51Osp8PbZN_e7st4DDHeU0uefTXlpnb-sJTNKtMVAv5RF9d2WfxF9uVl1gnj01Um10Y0df",  // your paypal application client id
    "client_secret" : "EE2oWxlxcj3NuBTDBVsNVql6JIhbcXhXvHGXUiWusYnEKr3-Hh6CEK6cL_RB55B_zE_X4lYGTYOlKRzB" // your paypal application secret id
  }
}

paypal.configure(config.api);

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a single record of Checkouts
exports.show = function(req, res) {
   Checkout.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a list of Checkouts
exports.canceled = function(req, res) {
 
 res.send("Payment canceled successfully.");
  // Checkout.findAsync()
  //   .then(responseWithResult(res))
  //   .catch(handleError(res));
};


// Gets a list of Checkouts
exports.index = function(req, res) {
  // var data = ccavenue.paymentRedirect(req); //It will get response from ccavenue payment. 

   var paymentId = req.session.paymentId;
  var payerId = req.param('PayerID');
  
   if(payerId){

  paypal.payment.execute(paymentId, { "payer_id": payerId }, function (error, payment) {
    if (error) {
      res.send(error);

    } else {

//for order history
      // for (var i = 0, len = addedOrders.length; i < len; i++) {
      //    var orderData={
      //         orderID: cart[i].product._id,
      //         orderStatus: commonFunctions.findElement(orderStatusArray, "name", "Processed"),
      //         createdDate: new Date(), 
      //         updatedDate: new Date(), 
      //     };


      //     ordersHistory.create(orderData)
      //       .then(function(data, err){});

      //   }
//for order history end 

      var paymentData={
        paymentMethod: payment.payer.payment_method,
        payment_mode: payment.transactions[0].related_resources[0].sale.payment_mode,
        orderID: payment.transactions[0].related_resources[0].sale.id,
        userID: 12,
        transactionID: paymentId,
        ammount: payment.transactions[0].amount.total,
        currency:payment.transactions[0].amount.currency,
        transactionDate: payment.create_time,
        payer_info:payment.payer.payer_info,
        status: payment.transactions[0].related_resources[0].sale.state
      };

  Checkout.createAsync(paymentData)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));

    }
  });

}else{
  res.send('Something went wrong');
}

};

// Gets a single Checkout from the DB
exports.makePayment = function(req, res) {

var orderStatusArray =[];
orderStatus.find().then(function(data, err){
orderStatusArray=data;
});
  var addedOrders=[];
  ShoppingCart.find({UserID:req.body.UserID, isDeleted:false})
    .populate('product','_id name mainImageUrl salePrice sku instock listPrice')
    .exec()
    .then(function(cart, err){
      if(err){
        console.log(err);
        res.send({error:err,message:'Cart is Empty'});
      }else{
        var totalPrice=0;
        for (var i = 0, len = cart.length; i < len; i++) {
          totalPrice+=cart[i].product.salePrice*cart[i].quantity;
         var orderData={
              productID: cart[i].product._id,
              userID: cart[i].UserID,
              salePrice: cart[i].product.salePrice,
              offerPrice: 0,
              orderAmount: totalPrice,
              userRemarks: req.body.userRemarks,
              paymentStatus: 'Pending',
              couponCode: req.body.coupon,
              ipAddress: req.body.ip,
              paymentMethod: req.body.paymentMethod,
              orderStatus: req.body.paymentMethod==='1' ? commonFunctions.findElement(orderStatusArray, "name", "Processed") : commonFunctions.findElement(orderStatusArray, "name", "Booked"),
              address: req.body.address,
              billingAddress: req.body.billingAddress,
              orderDate: new Date(),
              quantity: cart[i].quantity
          };


          orders.create(orderData)
            .then(function(data, err){
                addedOrders.push(data);
                 var orderHistoryData={
              orderID: data._id,
              orderStatus: req.body.paymentMethod==='1' ? commonFunctions.findElement(orderStatusArray, "name", "Processed") : commonFunctions.findElement(orderStatusArray, "name", "Booked"),
              createdDate: new Date(), 
              updatedDate: new Date(), 
              };


          ordersHistory.create(orderHistoryData)
            .then(function(data1, err1){
              console.log(data1);
            });

            });

        }


      }

    });

if(req.body.paymentMethod==='1'){

    ShoppingCart.update({UserID:req.body.UserID}, {isDeleted:req.body.isDeleted},{multi:true})    
    .then(function(data, err){}); 

   res.redirect(req.body.returnURL);

       

}

// for ccavenue
if(req.body.paymentMethod===3){
// ccavenue.setMerchant("ab4512vhvweb56g784433");
// ccavenue.setWorkingKey("AECGKJBBSERVFBG");
// ccavenue.setOrderId("abcd123");
// ccavenue.setRedirectUrl("http://localhost:9000/api/checkout");
// ccavenue.setOrderAmount("500");
 
//  var param = {
//   billing_cust_address: 'Bangalore', 
//   billing_cust_name: 'Nitish Kumar'
// };
// ccavenue.setOtherParams(param); //Set Customer Info 
  
//   ccavenue.makePayment(res); // It will redirect to ccavenue payment 
//   console.log(res);

}

//paypal payments 

if(req.body.paymentMethod===2){
 // paypal payment configuration.
  var payment = {
  "intent": "sale",
  "payer": {
    "payment_method": "paypal"
  },
  "redirect_urls": {
    "return_url": "http://localhost:9000/api/checkout",
    "cancel_url": "http://localhost:9000/api/checkout/canceled"
  },
  "transactions": [{
    "amount": {
      "total":10,
      "currency":  "USD"
    },
    "description": "test payment"
  }]
};
 
  paypal.payment.create(payment, function (error, payment) {
  if (error) {
    console.log(error);
  } else {
    if(payment.payer.payment_method === 'paypal') {
      req.session.paymentId = payment.id;
      var redirectUrl;
      console.log(payment);
      for(var i=0; i < payment.links.length; i++) {
        var link = payment.links[i];
        if (link.method === 'REDIRECT') {
          redirectUrl = link.href;
        }
      }

           for (var i = 0, len = addedOrders.length; i < len; i++) {
              orders.update({_id:addedOrders[i]._id}, {referenceNumber: payment.id})
              .then(function(data, err){});
            }

      res.redirect(redirectUrl);
    }
  }
});

}
  // Checkout.findByIdAsync(req.params.id)
  //   .then(handleEntityNotFound(res))
  //   .then(responseWithResult(res))
  //   .catch(handleError(res));
};

// Creates a new Checkout in the DB
exports.create = function(req, res) {
  Checkout.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Checkout in the DB
exports.update = function(req, res) {
  
  if (req.body._id) {
    delete req.body._id;
  }
  
  Checkout.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Checkout from the DB
exports.destroy = function(req, res) {
  Checkout.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
