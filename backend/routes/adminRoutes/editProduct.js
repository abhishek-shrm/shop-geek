var express=require('express');
var router=express.Router();
var Category=require('../../models/category');
var Product=require('../../models/product');
const AWS= require('aws-sdk');

//GET edit category

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

//POST edit category
router.post('/:id',(req,res)=>{
  var title=req.body.title;
  var slug=title.replace(/\s+/g,'-').toLowerCase();
  var id=req.params.id;

  Category.findOne({slug:slug,_id:{'$ne':id}},(err,cat)=>{
    if(cat){
      res.send({
        title:title,
        error:'Category already exists, please choose another'
      });
    }else{
      Category.findById(id,(err,cats)=>{
        if(err){
          console.log(err);
        }else{
          cats.title=title;
          cats.slug=slug;
          cats.save(err=>{
            if(err){
              console.log(err);
            }
            else{
              res.send({
                title:title,
                success:'Category edited successfully'
              });
            }
          })
        }
      })
    }
  })
})

//Exports
module.exports=router;