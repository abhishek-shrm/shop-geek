var express=require('express');
var router=express.Router();
var Order=require('../models/order');
var Product=require('../models/product');
const AWS= require('aws-sdk');
var checkAuth=require('./check-auth');

//GET orders by a user
router.post('/',checkAuth,(req,res)=>{
  Order.findOne({username:req.body.username},(err,userOrders)=>{
    if(err){
      console.log(err);
    }
    if(userOrders){
      var Orders=userOrders.orders;
      Orders.forEach(order => {
        var t=new Date(order.time).toString().split(' ');
        var orderTime=`${t[2]} ${t[1]} ${t[3]} ${t[4].split(':')[0]}:${t[4].split(':')[1]}`
        order.time=orderTime;
      });
      res.send({
        orders:Orders
      });
    }
    if(!userOrders){
      res.sendStatus(404);
    }
  });
});

//Exports
module.exports=router;