var express=require('express');
var router=express.Router();
var Product=require('../../models/product');
var Category=require('../../models/category');
var mkdirp = require('mkdirp');
var fs = require('fs-extra');
var resizeImg = require('resize-img');
const AWS= require('aws-sdk');
var checkAuth=require('../check-auth');


router.post('/',checkAuth,(req,res)=>{

  var title=req.body.title;
  var slug=title.replace(/\s+/g,'-').toLowerCase();
  var description=req.body.description;
  var price=req.body.price;
  var category=req.body.category;
  var imageFile;

  //so that expressValidator does not throw error
  if(req.files.image!=null){
    imageFile=req.files.image.name;
  }else if(req.files.image==null){
    imageFile='';
  }

  req.checkBody('image','Uploaded file is not an image').isImage(imageFile);

  var errors=req.validationErrors();

  if(errors){
    res.send({
      errors:errors,
      title:title,
      description:description,
      price:price,
      category:category
    });
  }else{
    Product.findOne({slug:slug},(err,p)=>{
      if(p){
        res.send({
          errors:'Product already exists in database!',
          title:title,
          description:description,
          price:price,
          category:category
        });
      }else{

        var priceFlt=parseFloat(price).toFixed(2);

        var product=new Product({
          title:title,
          slug:slug,
          description:description,
          category:category,
          price:priceFlt,
          image:imageFile
        });

        product.save(err=>{
          if(err){
            console.log(err);
          }else{
            // mkdirp('public/product_images/'+product._id,err=>{
            //   return console.log(err);
            // });
            // mkdirp('public/product_images/'+product._id+'/gallery',err=>{
            //   return console.log(err);
            // });
            // mkdirp('public/product_images/'+product._id+'/gallery/thumbs',err=>{
            //   return console.log(err);
            // });

            if(imageFile!=''){
              var productImage=req.files.image.data;
              var s3 = new AWS.S3();

              var myKey=product._id+'/'+product.image;

              var params = {
                Bucket: process.env.BUCKET,
                Body : productImage,
                Key : `${myKey}`
              };

              s3.upload(params,(err,data)=>{
                if(err){
                  console.log(err);
                }
                if(data){
                  res.send({
                    success:'Product added successfully!!'
                  });
                }
              });
            }
          }
        });
      }
    });
  }

});

//Exports
module.exports=router;