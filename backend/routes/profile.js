var express=require('express');
var router=express.Router();
var UserDetails=require('../models/userDetails');
var checkAuth=require('./check-auth');

//GET My Profile
router.post('/',checkAuth,(req,res)=>{
  UserDetails.findOne({username:req.body.username},(err,userDetails)=>{
    if(err){
      console.log(err);
    }
    if(userDetails){
      res.send(userDetails);
    }
  });
});

//POST Edit My Profile
router.post('/edit',checkAuth,(req,res)=>{
  var email=req.body.email;
  var username=req.body.username;
  var address=req.body.address;
  var pinCode=req.body.pinCode;
  var mobile=req.body.mobile;
  var firstName=req.body.firstName;
  var lastName=req.body.lastName;
  var city=req.body.city;
  var state=req.body.state;
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
      firstName:firstName,
      lastName:lastName,
      city:city,
      state:state,
      errors:errors
    });
  }
  else{
    UserDetails.findOne({username:username},(error,user)=>{
      if(error){
        console.log(error);
      }
      if(user){
        user.firstName=firstName;
        user.lastName=lastName;
        user.pinCode=pinCode;
        user.address=address;
        user.state=state;
        user.mobile=mobile;
        user.city=city;
        
        user.save(err=>{
          if(err){
            console.log(err);
          }
          else{
            res.send({
              success:'Profile Edited successfully!!'
            });
          }
        });
      }
    });
  }
});

//Exports
module.exports=router;