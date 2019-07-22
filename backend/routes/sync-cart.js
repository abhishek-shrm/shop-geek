var express=require('express');
var router=express.Router();
var Cart=require('../models/cart');
const AWS= require('aws-sdk');
var checkAuth=require('./check-auth');

//upload Cart
router.post('/',checkAuth,(req,res)=>{
  Cart.findOne({username:req.body.username},(err,c)=>{
    if(err){
      console.log(err);
    }
    if(c){
      c.cart=req.body.cart;
      c.cartCount=req.body.cartCount;
      c.save(error=>{
        if(error){
          console.log(error);
        }
        else{
          res.sendStatus(200);
        }
      });
    }
    if(!c){
      res.sendStatus(404);
    }
  });
});

//clear Cart
router.post('/clear',checkAuth,(req,res)=>{
  Cart.findOne({username:req.body.username},(e,c)=>{
    if(e){
      console.log(e);
    }
    if(c){
      c.cart=[];
      c.cartCount=0;
      c.save(error=>{
        if(error){
          console.log(error);
        }
        else{
          res.sendStatus(200);
        }
      });
    }
    if(!c){
      res.sendStatus(404);
    }
  });
});

//Exports
module.exports=router;