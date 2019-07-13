var express=require('express');
var router=express.Router();
var Category=require('../models/category');
var Product=require('../models/product');
const AWS= require('aws-sdk');

router.post('/',(req,res)=>{
  var cart=req.body.cart;
  var products=[];
  var productImagesLink=[];
  var s3= new AWS.S3();
  
  //for waiting for async for loop
  var getCart=new Promise((resolve,reject)=>{

    Array.prototype.forEach.call(cart,(cartProduct,index) => {
      Product.findById(cartProduct.id,(err,product)=>{
        if(err){
          console.log(err);
        }
        else{
          //for adding key value pair into mongoose response object
          var productJ=JSON.parse(JSON.stringify(product));
          productJ.qty=cartProduct.qty;
          products.push(productJ);
          var imageKey=productJ._id+'/'+productJ.image;
          var imageLink=s3.getSignedUrl('getObject',{
            Bucket:process.env.BUCKET,
            Key:`${imageKey}`,
            Expires: 1000
          });
          productImagesLink.push(imageLink);
          if (Object.is(cart.length - 1, index)) resolve();
        }
      });
    });
  });

  getCart.then(()=>{
    res.send({
      products:products,
      productImagesLink:productImagesLink
    });
  });
  
});

//Exports
module.exports=router;