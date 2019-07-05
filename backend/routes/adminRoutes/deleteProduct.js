var express=require('express');
var router=express.Router();
var Product=require('../../models/product');
const AWS= require('aws-sdk');

router.get('/:id',(req,res)=>{

      var s3=new AWS.S3();
      var thumbsKeyList,galleryKeyList,keyList;

      var thumbParams={
        Bucket:process.env.BUCKET,
        Delimiter:'/',
        Prefix:`${req.params.id}/gallery/thumbs/`
      };
      var galleryParams={
        Bucket:process.env.BUCKET,
        Delimiter:'/',
        Prefix:`${req.params.id}/gallery/`
      };
      var params={
        Bucket:process.env.BUCKET,
        Delimiter:'/',
        Prefix:`${req.params.id}/`
      };

      //for getting list of objects inside thumbs
      s3.listObjectsV2(thumbParams,(err,data)=>{
        if(err){
          console.log(err);
        }
        if(data.Contents.length!=0){
          thumbsKeyList=data.Contents.map(content=>{
            return content.Key;
          });
          thumbsKeyList.forEach(thumbsKey=>{
            s3.deleteObject({
              Bucket:process.env.BUCKET,
              Key:`${thumbsKey}`
            },(err,data)=>{
              if(err){
                console.log(err);
              }
              else{
    
              }
            });
          });
        }
      });


      //for getting list of objects inside gallery
      s3.listObjectsV2(galleryParams,(err,data)=>{
        if(err){
          console.log(err);
        }
        if(data.Contents.length!=0){
          galleryKeyList=data.Contents.map(content=>{
            return content.Key;
          });
          galleryKeyList.forEach(galleryKey=>{
            s3.deleteObject({
              Bucket:process.env.BUCKET,
              Key:`${galleryKey}`
            },(err,data)=>{
              if(err){
                console.log(err);
              }
              else{
    
              }
            });
          });
        }
      });

      //for getting key of single image in id folder
      s3.listObjectsV2(params,(err,data)=>{
        if(err){
          console.log(err);
        }
        if(data.Contents.length!=0){
          keyList=data.Contents.map(content=>{
            return content.Key;
          });
          keyList.forEach(key=>{
            s3.deleteObject({
              Bucket:process.env.BUCKET,
              Key:`${key}`
            },(err,data)=>{
              if(err){
                console.log(err);
              }
              else{
                Product.findByIdAndRemove(req.params.id,err=>{
                  if(err){
                    console.log(err);
                  }
                  else{
                    res.send({
                      success:'Product deleted! Please refresh the page to see changes occured'
                    });
                  }
                });
              }
            });
          });
        }
      });
      // res.send({
      //   success:'Category deleted! Please refresh the page to see changes occured'
      // });
    });

//Exports
module.exports=router;