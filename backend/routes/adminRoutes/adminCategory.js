var express=require('express');
var router=express.Router();
var Category=require('../../models/category');

//Get categories
router.get('/',(req,res)=>{
  Category.find({}).sort({sorting:1}).exec((err,cats)=>{
    if(err){
      console.log(err);
    }
    else{
    res.send(cats);
    }
  });
});

//Exports
module.exports=router;