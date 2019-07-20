var express=require('express');
var router=express.Router();
var bcrypt=require('bcryptjs');
var JWT=require('jsonwebtoken');
var User=require('../models/user');
var UserDetails=require('../models/userDetails');
var checkAuth=require('./check-auth');

//POST register user
router.post('/',(req,res)=>{
  var username=req.body.username;
  var email=req.body.email;
  var password=req.body.password;
  //check if username exists
  User.findOne({username:username},(er,a)=>{ //'a' is existing user with username and 'er' is error
    if(er){
      console.log(er);
    }
    if(a){
      res.send({
        username:username,
        email:email,
        password:password,
        errors:'Username already exists!'
      });
    }
    else{
      //check if email exists
      User.findOne({email:email},(err,b)=>{ //'b' is existing user with email
        if(err){
          console.log(err);
        }
        if(b){
          res.send({
            username:username,
            email:email,
            password:password,
            errors:'Email already used!'
          });
        }
        else{
          //hash the password
          bcrypt.hash(password,10,(bcryptError,hash)=>{
            if(bcryptError){
              console.log(bcryptError);
            }
            else{
              //save the user
              var user=new User({
                username:username,
                email:email,
                password:hash,
                admin:true
              });
              user.save(error=>{
                if(error){
                  console.log(error);
                }
                else{
                  //sign a registerToken
                  const token=JWT.sign({
                    email:email,
                    username:username
                  },process.env.JWT_SECRET,{
                    expiresIn:60*30
                  });
                  //send registerToken
                  res.send({
                    email:email,
                    username:username,
                    token:token,
                    success:'You are registered successfully'
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

//POST register user details
router.post('/details',checkAuth,(req,res)=>{ //checkauth authenticates the registerToken
  var email=req.body.email;
  var username=req.body.username;
  var address=req.body.address;
  var pinCode=req.body.pinCode;
  var mobile=req.body.mobile;
  //check mobile no. is of 10 chars
  req.checkBody('mobile','Invalid Mobile No.').isNumeric();
  req.checkBody('pinCode','PIN Code must be Numeric').isNumeric();
  req.checkBody('mobile','Mobile No. must be of 10 digits').isLength({min:10,max:10});
  req.checkBody('pinCode','PIN Code must be of 6 digits').isLength({min:6,max:6});

  var errors=req.validationErrors();
  if(errors){
    res.send({
      email:email,
      username:username,
      address:address,
      pinCode:pinCode,
      mobile:mobile,
      errors:errors
    });
  }
  else{
    //create userDetails data with username and email in common
    var userDetails=new UserDetails({
      username:username,
      email:email,
      mobile:parseInt(mobile),
      address:address,
      pinCode:parseInt(pinCode)
    });
    userDetails.save(err=>{
      if(err){
        console.log(err);
      }
      else{
        res.send({
          success:'Details Registered successfully!!'
        });
      }
    })
  }
});

//export router
module.exports=router;