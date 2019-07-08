var express=require('express');
var router=express.Router();
var Product=require('../models/product');
const AWS= require('aws-sdk');

router.get('/:slug',(req,res)=>{

  Product.findOne({slug:req.params.slug}).exec((err,product)=>{

    if(err){
      console.log(err);
    }
    else{
      var s3=new AWS.S3();
      var imageKey=product._id+'/'+product.image;
      var galleryKey=product._id+'/gallery/';
      var thumbsKey=product._id+'/gallery/thumbs/';
  
      var galleryParams={
        Bucket:process.env.BUCKET,
        Delimiter:'/',
        Prefix:`${galleryKey}`
      };
  
      var thumbsParams={
        Bucket:process.env.BUCKET,
        Delimiter:'/',
        Prefix:`${thumbsKey}`
      };

      //for main product image
      var imageURL=s3.getSignedUrl('getObject',{
        Bucket:process.env.BUCKET,
        Key:`${imageKey}`,
        Expires: 1000
      });

      //for product's gallery images
      s3.listObjectsV2(galleryParams,(err,data)=>{
        if(err){
          console.log(err);
        }
        if(data){
          var galleryList=data.Contents.map(image=>{
            return image;
          });
          //array of link to gallery images
          var galleryImageLink=galleryList.map(listedGalleryImage=>{
            var galleryImageKey=listedGalleryImage.Key;
            return s3.getSignedUrl('getObject',{
                     Bucket:process.env.BUCKET,
                     Key:`${galleryImageKey}`,
                     Expires: 1000
                   });
          });

          //for product's thumbnails
          s3.listObjectsV2(thumbsParams,(error,thumbsData)=>{
            if(error){
              console.log(err);
            }
            if(thumbsData){
              var thumbsList=thumbsData.Contents.map(thumb=>{
                return thumb;
              });
              //array of link to thumbnails
              var thumbsImageLink=thumbsList.map(listedThumbImage=>{
                var thumbImageKey=listedThumbImage.Key;
                return s3.getSignedUrl('getObject',{
                  Bucket:process.env.BUCKET,
                  Key:`${thumbImageKey}`,
                  Expires:1000
                });
              });

              //sending response
              res.send({
                product:product,
                imageURL:imageURL,
                galleryImageLink:galleryImageLink,
                thumbsImageLink:thumbsImageLink
              });
            }
          });
        }
      });
    }
    
  });
});

//Exports
module.exports=router;