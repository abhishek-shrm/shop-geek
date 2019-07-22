var express=require('express');
var router=express.Router();
var Order=require('../models/order');
var Product=require('../models/product');
const AWS= require('aws-sdk');
var checkAuth=require('./check-auth');

//GET cart items
router.post('/',checkAuth,(req,res)=>{
  var cart=req.body.cart;
  var products=[];
  
  //for waiting for async for loop
  var getCart=new Promise((resolve,reject)=>{

    Array.prototype.forEach.call(cart,(cartProduct,index) => {
      Product.findById(cartProduct.id,(err,product)=>{
        if(err){
          console.log(err);
        }
        else{
          //for adding qty key value pair into mongoose response object
          var productJ=JSON.parse(JSON.stringify(product));
          productJ.qty=cartProduct.qty;
          products.push(productJ);
          if (Object.is(cart.length - 1, index)) resolve();
        }
      });
    });
  });

  getCart.then(()=>{
    res.send({
      products:products
    });
  });
});

//POST purchase products
router.post('/order',checkAuth,(req,res)=>{
  var order=req.body.order;
  var username=req.body.username;

  Order.findOne({username:username},(err,userOrders)=>{
    if(err){
      console.log(err);
    }
    if(userOrders){
      userOrders.orders.push(order);
      userOrders.save(error=>{
        if(error){
          console.log(error);
        }
        else{
          res.sendStatus(200);
        }
      })
    }
    if(!userOrders){
      res.sendStatus(404);
    }
  });

});

//Exports
module.exports=router;