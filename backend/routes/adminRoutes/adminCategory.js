var express=require('express');
var router=express.Router();
var Category=require('../../models/category');
var checkAuth=require('../check-auth');

//GET categories
router.get('/',checkAuth,(req,res)=>{
  Category.find({}).sort({sorting:1}).exec((err,cats)=>{
    if(err){
      console.log(err);
    }
    else{
    res.send(cats);
    }
  });
});

//POST reorder categories
router.post('/reorder-category',checkAuth,(req,res)=>{
  var ids=req.body.ids;
  var id=req.body.id;
  var count=0;
  for(var i=0;i<ids.length;i++){
    var elementID=ids[i];
    count++;
    //IIFE for changing sort order of categories because node is async
    (function(count){
      Category.findById(elementID,(err,cat)=>{
        cat.sorting=count;
        cat.save(err=>{
          if(err){
            console.log(err);
          }
        });
      });
    })(count);
  }
});

//Exports
module.exports=router;