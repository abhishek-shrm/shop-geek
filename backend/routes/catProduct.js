var express=require('express');
var router=express.Router();
var Product=require('../models/product');
const AWS= require('aws-sdk');

router.get('/:category',(req,res)=>{
  Product.find({category:req.params.category}).sort({title:1}).exec((err,products)=>{
    if(err){
      console.log(err);
    }
    else{
      var s3 = new AWS.S3();
      var URL=products.map(product=>{
        var myKey=product._id+'/'+product.image;
        return s3.getSignedUrl('getObject',{
          Bucket:process.env.BUCKET,
          Key:`${myKey}`,
          Expires: 1000
        });
      });
      res.send({
        products:products,
        url:URL
      });
    }
  });
})

//Exports
module.exports=router;