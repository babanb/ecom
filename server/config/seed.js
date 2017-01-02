/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Product from '../api/products/products.model'; 
import PaymentStatus from '../api/paymentStatus/paymentStatus.model'; 
import productProperties from '../api/uploadProductsProperties/uploadProductsProperties.model'; 
import orderStatus from '../api/orderStatus/orderStatus.model'; 

User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
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
 
productProperties.find({}).removeAsync()
  .then(function() {
    productProperties.createAsync({
    fieldName: "Product_Name",
    ProductMappingfield: "name",
    dataType: "string",
    isImage: false,
    specialConditionValue: "~,`,!,@,#,$,%,:,^,*,=,/,\"\\",
    isRequired: true,
    subCategory: "Common"
  },
  {
    fieldName: "Product_sku",
    ProductMappingfield: "sku",
    dataType: "string",
    isImage: false,
    specialConditionValue: "~,`,!,@,#,$,%,:,^,*,=,/,\"\\",
    isRequired: true,
    subCategory: "Common"
  },
  {
    fieldName: "category_name",
    ProductMappingfield: "cat",
    dataType: "string",
    isImage: false,
    specialConditionValue: "~,`,!,@,#,$,%,:,^,*,=,/,\"\\",
    isRequired: true,
    subCategory: "Common"
  },
  {
    fieldName: "department_name",
    ProductMappingfield: "dept",
    dataType: "string",
    isImage: false,
    specialConditionValue: "~,`,!,@,#,$,%,:,^,*,=,/,\"\\",
    isRequired: true,
    subCategory: "Common"
  },
  {
    fieldName: "sub_category",
    ProductMappingfield: "subCat",
    dataType: "string",
    isImage: false,
    specialConditionValue: "~,`,!,@,#,$,%,:,^,*,=,/,\"\\",
    isRequired: true,
    subCategory: "Common"
  },
  {
    fieldName: "vendorID",
    ProductMappingfield: "vendorID",
    dataType: "number",
    isImage: false,
    specialConditionValue: "~,`,!,@,#,$,%,:,^,*,=,/,\"\\",
    isRequired: true,
    subCategory: "Common"
  },
  {
    fieldName: "sale_Price",
    ProductMappingfield: "salePrice",
    dataType: "number",
    isImage: false,
    specialConditionValue: "",
    isRequired: true,
    subCategory: "Common"
  },
  {
    fieldName: "list_Price",
    ProductMappingfield: "listPrice",
    dataType: "number",
    isImage: false,
    specialConditionValue: "",
    isRequired: true,
    subCategory: "Common"
  },
  {
    fieldName: "main_Image_Url",
    ProductMappingfield: "mainImageUrl",
    dataType: "string",
    isImage: true,
    specialConditionValue: "~,`,!,@,#,$,%,:,^,*,=,/,\"\\",
    isRequired: true,
    subCategory: "Common"
  },
  {
    fieldName: "other_image_url1",
    ProductMappingfield: "otherImageUrl1",
    dataType: "string",
    isImage: true,
    specialConditionValue: "~,`,!,@,#,$,%,:,^,*,=,/,\"\\",
    isRequired: false,
    subCategory: "Common"
  },
  {
    fieldName: "other_image_url2",
    ProductMappingfield: "otherImageUrl2",
    dataType: "string",
    isImage: true,
    specialConditionValue: "~,`,!,@,#,$,%,:,^,*,=,/,\"\\",
    isRequired: false,
    subCategory: "Common"
  },
  {
    fieldName: "other_image_url3",
    ProductMappingfield: "otherImageUrl3",
    dataType: "string",
    isImage: true,
    specialConditionValue: "~,`,!,@,#,$,%,:,^,*,=,/,\"\\",
    isRequired: false,
    subCategory: "Common"
  },
  {
    fieldName: "other_image_url4",
    ProductMappingfield: "otherImageUrl4",
    dataType: "string",
    isImage: true,
    specialConditionValue: "~,`,!,@,#,$,%,:,^,*,=,/,\"\\",
    isRequired: false,
    subCategory: "Common"
  },
  {
    fieldName: "other_image_url5",
    ProductMappingfield: "otherImageUrl5",
    dataType: "string",
    isImage: true,
    specialConditionValue: "~,`,!,@,#,$,%,:,^,*,=,/,\"\\",
    isRequired: false,
    subCategory: "Common"
  },
  {
    fieldName: "other_image_url6",
    ProductMappingfield: "otherImageUrl6",
    dataType: "string",
    isImage: true,
    specialConditionValue: "~,`,!,@,#,$,%,:,^,*,=,/,\"\\",
    isRequired: false,
    subCategory: "Common"
  },
  {
    fieldName: "other_image_url7",
    ProductMappingfield: "otherImageUrl7",
    dataType: "string",
    isImage: true,
    specialConditionValue: "~,`,!,@,#,$,%,:,^,*,=,/,\"\\",
    isRequired: false,
    subCategory: "Common"
  },
  {
    fieldName: "other_image_url8",
    ProductMappingfield: "otherImageUrl8",
    dataType: "string",
    isImage: true,
    specialConditionValue: "~,`,!,@,#,$,%,:,^,*,=,/,\"\\",
    isRequired: false,
    subCategory: "Common"
  })
    .then(function() {
      console.log('finished populating users');
    });
  });


orderStatus.find({}).removeAsync()
  .then(function() {
    orderStatus.createAsync({
    name: "Processed",
    description: "Specifies that Payment has been completed or the order is Cash on Delivery, and the order is ready to confirm from vendor or admin."
  },
  {
    name: "Booked",
    description: "The order is Booked, and waiting for payment."
  },
  {
    name: "Confirmed",
    description: "The order has been confirmed by the vendor or admin, and it is ready for pcikup."
  },
  {
    name: "Dispatched",
    description: "The order has been pickuped successfully."
  },
  {
    name: "Cancelled",
    description: "The order is Cancelled."
  },
  {
    name: "Shipped",
    description: "Specifies that the order has been shipped."
  },
  {
    name: "Returned",
    description: "Specifies that the order has been Returned successfully."
  },
  {
    name: "Replaced",
    description: "Specifies that the order has been Replaced successfully."
  },
  {
    name: "Declined",
    description: "Specifies that the order has been declined by the vendor or admin."
  },
  {
    name: "Delivered",
    description: "Specifies that the order has been delivered successfully"
   
  },
  {
    name: "InTransit",
    description: "Specifies that the order has been shipped successfully, and its InTransit now."
   
  },
  {
    name: "RequestedForReturn",
    description: "Specifies that the order has requested to return by user, and waiting for pickup."
   
  },
  {
    name: "PickupedFromUser",
    description: "Specifies that the return order has been pickuped from user."
   
  },
  {
    name: "RequestedForReplace",
    description: "Specifies that the order has requested to replace by user."
   
  })
    .then(function() {
      console.log('finished populating PaymentStatus');
    });
  });

PaymentStatus.find({}).removeAsync()
  .then(function() {
    PaymentStatus.createAsync({
    name: "completed",
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

