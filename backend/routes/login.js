var express=require('express');
var router=express.Router();
var bcrypt=require('bcryptjs');
var JWT=require('jsonwebtoken');
var User=require('../models/user');
var Cart=require('../models/cart');
var UserDetails=require('../models/userDetails');

//POST user login
router.post('/',(req,res)=>{
  var username=req.body.username;
  var password=req.body.password;
  //find user by username
  User.findOne({username:username},(e,user)=>{
    if(e){
      console.log(e);
    }
    if(user){
      //compare password if OK
      bcrypt.compare(password,user.password,(err,result)=>{
        if(err){
          console.log(err);
        }
        if(result){
          //find cart for user in database
          Cart.findOne({username:username},(error,c)=>{
            if(error){
              console.log(error);
            }
            if(c){
              //generate token
              const token=JWT.sign({
                email:user.email,
                username:user.username
              },process.env.JWT_SECRET,{
                expiresIn:'24h'
              });
              //send token with user and cart
              res.send({
                username:user.username,
                token:token,
                admin:user.admin,
                cart:c.cart,
                cartCount:c.cartCount,
                success:`Welcome! ${user.username} to SHOP-GEEK`
              });
            }
          });
        }
        if(!result){
          //if password not equal send error
          res.send({
            errors:'Invalid username or password!!',
            username:username,
            password:password
          });
        }
      });
    }else{
      res.send({
        errors:'Invalid username or password!!',
        username:username,
        password:password
      });
    }

  });
});

//export router
module.exports=router;