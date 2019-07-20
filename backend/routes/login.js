var express=require('express');
var router=express.Router();
var bcrypt=require('bcryptjs');
var JWT=require('jsonwebtoken');
var User=require('../models/user');
var UserDetails=require('../models/userDetails');
var checkAuth=require('./check-auth');

//POST user login
router.post('/',(req,res)=>{
  var username=req.body.username;
  var password=req.body.password;
  //find user by username
  User.findOne({username:username},(err,user)=>{
    if(err){
      console.log(err);
    }
    if(user){
      //compare password if OK
      bcrypt.compare(password,user.password,(err,result)=>{
        if(err){
          console.log(err);
        }
        if(result){
          //generate token
          const token=JWT.sign({
            email:user.email,
            username:user.username
          },process.env.JWT_SECRET,{
            expiresIn:'24h'
          });
          //send token
          res.send({
            username:user.username,
            token:token,
            success:`Welcome! ${user.username} to SHOP-GEEK`
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