var express=require('express');
var router=express.Router();
var Category=require('../../models/category');
var Product=require('../../models/product');
const AWS= require('aws-sdk');
var resizeImg=require('resize-img');

//GET edit product

router.get('/:id',(req,res)=>{
  Product.findById({_id:req.params.id},(err,product)=>{
    if(err){
      console.log(err);
    }else{
      var s3=new AWS.S3();
      var myKey=product._id+'/'+product.image;
      var URL=s3.getSignedUrl('getObject',{
          Bucket:process.env.BUCKET,
          Key:`${myKey}`,
          Expires: 1000
      });
      res.send({
        product:product,
        URL:URL
      });
    }
  });
});

//POST edit product
router.post('/:id',(req,res)=>{

  var id=req.params.id;
  var title=req.body.title;
  var slug=title.replace(/\s+/g,'-').toLowerCase();
  var description=req.body.description;
  var price=req.body.price;
  var category=req.body.category;
  var presentImage=req.body.presentImage;
  var imageFileName;

  //so that expressValidator does not throw error
  if(req.files!=null){
    imageFileName=req.files.image.name;
    req.checkBody('image','Uploaded file is not an image').isImage(imageFileName);
  }else if(req.files==null){
    imageFileName='';
  }

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
    
    Product.findOne({slug:slug,_id:{'$ne':id}},(err,prd)=>{
      if(prd){
        res.send({
          title:title,
          description:description,
          price:price,
          category:category,
          errors:'Product already exists, please choose another'
        });
      }
      else{
        Product.findById(id,(err,product)=>{
          if(err){
            console.log(err);
          }
          else{
            var priceFlt=parseFloat(price).toFixed(2);

            product.title=title;
            product.slug=slug;
            product.description=description;
            product.category=category;
            product.price=priceFlt;
            if(imageFileName!=''){
              product.image=imageFileName;
            }

            product.save(err=>{
              if(err){
                console.log(err);
              }
              else{
                if(imageFileName!=''){
                  var productImage=req.files.image.data;
                  var s3 = new AWS.S3();
    
                  var uploadKey=product._id+'/'+product.image;
                  var deleteKey=product._id+'/'+presentImage;
    
                  var uploadParams = {
                    Bucket: process.env.BUCKET,
                    Body : productImage,
                    Key : `${uploadKey}`
                  };

                  var deleteParams={
                    Bucket:process.env.BUCKET,
                    Key:`${deleteKey}`
                  };
                  s3.upload(uploadParams,(err,data)=>{
                      if(err){
                        console.log(err);
                      }
                      if(data){
                        res.send({
                        success:'Product edited successfully!!'
                      });
                    }
                  });
                  s3.deleteObject(deleteParams,(err,data)=>{
                    if(err){
                      console.log(err);
                    }
                    else{
                    }
                  });
                }
              }
            });
          }
        });
      }
    });
  }
});

//POST gallery images
router.post('/gallery/:id',(req,res)=>{
  var s3 =new AWS.S3();

  var id=req.params.id;
  var imageFile=req.files.file.data;
  var imageName=req.files.file.name;
  var thumbsFile;

  imageKey=id+'/gallery/'+imageName;

  resizeImg(imageFile,{width:100,height:100}).then(buf=>{
    thumbsFile=buf;
    var thumbsParams={
      Bucket: process.env.BUCKET,
      Body : thumbsFile,
      Key : `${resizeImageKey}`
    };
    s3.upload(thumbsParams,(err,data)=>{
      if(err){
        console.log(err);
      }
      if(data){

      }
    });
  });
  resizeImageKey=id+'/gallery/thumbs/'+imageName;

  var params={
    Bucket: process.env.BUCKET,
    Body : imageFile,
    Key : `${imageKey}`
  };

  s3.upload(params,(err,data)=>{
    if(err){
      console.log(err);
    }
    if(data){
      res.sendStatus(200);
    }
  });

});

//GET delete Gallery Images
router.get('/delete-gallery/:id/:fileName',(req,res)=>{
  var id=req.params.id;
  var fileName=req.params.fileName;

  var s3=new AWS.S3();

  var deleteKey=id+'/gallery/'+fileName;
  var deleteThumbsKey=id+'/gallery/thumbs/'+fileName;

  var params={
    Bucket:process.env.BUCKET,
    Key:`${deleteKey}`
  };

  var thumbsParams={
    Bucket:process.env.BUCKET,
    Key:`${deleteThumbsKey}`
  }

  s3.deleteObject(params,(err,data)=>{
    if(err){
      console.log(err);
    }
    else{
      s3.deleteObject(thumbsParams,(error,data)=>{
        if(error){
          console.log(error);
        }
        else{
          res.sendStatus(200);
        }
      });
    }
  });
});

//GET gallery images
router.get('/galleryImages/:id',(req,res)=>{
  var id=req.params.id;
  var listKey=id+'/gallery/';
  var list;
  var s3= new AWS.S3();

  var params={
    Bucket:process.env.BUCKET,
    Delimiter:'/',
    Prefix:`${listKey}`
  };

  s3.listObjects(params,(err,data)=>{
    if(err){
      console.log(err);
    }
    if(data){
      list=data.Contents.map(image=>{
        return image;
      });
      var galleryImageLink=list.map(listedImage=>{
        var galleryImageKey=listedImage.Key;
        return s3.getSignedUrl('getObject',{
                 Bucket:process.env.BUCKET,
                 Key:`${galleryImageKey}`,
                 Expires: 1000
               });
      });
      res.send({
        list:list,
        URL:galleryImageLink
      });
    }
  });

});

//Exports
module.exports=router;