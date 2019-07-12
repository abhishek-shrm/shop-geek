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
    for(let i=0;i<cart.length;i++){
      Product.findById(cart[i].id,(err,product)=>{
        if(err){
          console.log(err);
        }
        else{
          products.push(product);
          let imageKey=product._id+'/'+product.image;
          let imageLink=s3.getSignedUrl('getObject',{
            Bucket:process.env.BUCKET,
            Key:`${imageKey}`,
            Expires: 1000
          });
          productImagesLink.push(imageLink);
          if(i==cart.length-1) resolve();
        }
      });
    }
  });

  getCart.then(()=>{
    res.send({
      products:products,
      productImagesLink:productImagesLink
    });
  });

  // Array.prototype.forEach.call(cart,cartProduct => {
  //   Product.findById(cartProduct.id,(err,product)=>{
  //     if(err){
  //       console.log(err);
  //     }
  //     else{
  //       products.push(product);
  //       var imageKey=product._id+'/'+product.image;
  //       var imageLink=s3.getSignedUrl('getObject',{
  //         Bucket:process.env.BUCKET,
  //         Key:`${imageKey}`,
  //         Expires: 1000
  //       });
  //       productImagesLink.push(imageLink);
  //     }
  //   });
  // });
  // res.send({
  //   products:products,
  //   imagesLink:productImagesLink
  // });
  
});

//Exports
module.exports=router;