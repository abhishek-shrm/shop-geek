var express=require('express');
var router=express.Router();
var Product=require('../../models/product');
var Category=require('../../models/category');
var mkdirp=require('mkdirp');
var fs=require('fs-extra');
var resizeImg=require('resize-img');

//GET products
router.get('/',(req,res)=>{
  var count;

  Product.count((err,c)=>{
    count=c;
  });
  Product.find((err,products)=>{
    res.send({
      products:products,
      count:count
    });
  });
});

//Exports
module.exports=router;