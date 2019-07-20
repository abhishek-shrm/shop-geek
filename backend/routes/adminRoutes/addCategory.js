var express=require('express');
var router=express.Router();
var Category=require('../../models/category');
var checkAuth=require('../check-auth');

router.post('/',checkAuth,(req,res)=>{

  var title=req.body.title;
  var slug=title.replace(/\s+/g,'-').toLowerCase();

  Category.findOne({slug:slug},(err,cat)=>{
    if(cat){
      res.send({
        title:title,
        error:'Category already exists, please choose another'
      });
    }else{
      var category=new Category({
        title:title,
        slug:slug,
        sorting:100
      });
      category.save(err=>{
        if(err){
          console.log(err);
        }else{
          Category.find({}).sort({sorting:1}).exec((err,cats)=>{
            if(err){
              console.log(err);
            }else{
              res.send({
                title:title,
                success:'Category added successfully'
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