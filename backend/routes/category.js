var express=require('express');
var router=express.Router();
var Category=require('../models/category');
const AWS= require('aws-sdk');

//GET categories
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

//GET category name from slug
router.get('/:slug',(req,res)=>{
  var slugParam=req.params.slug;
  Category.findOne({slug:slugParam}).exec((err,cat)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send({
        category:cat.title
      });
    }
  });
});

//Exports
module.exports=router;