var express=require('express');
var router=express.Router();
var Product=require('../../models/product');
var Category=require('../../models/category');
var mkdirp=require('mkdirp');
var fs=require('fs-extra');
var resizeImg=require('resize-img');
const AWS= require('aws-sdk');

//GET products
router.get('/',(req,res)=>{
  var count;

  Product.count((err,c)=>{
    count=c;
  });

  Product.find((err,products)=>{

    var s3 = new AWS.S3();

    var myKey=products[2]._id+'/'+products[2].image;

    let URL=s3.getSignedUrl('getObject', {
      Bucket: 'shop-geek-products',
      Key: `${myKey}`, //filename
      Expires: 10 //time to expire in seconds
  });

    res.send({
      products:products,
      count:count,
      url:URL
    });
  });
});

//Exports
module.exports=router;