var express=require('express');
var router=express.Router();
var Category=require('../../models/category');
var checkAuth=require('../check-auth');

router.get('/:id',checkAuth,(req,res)=>{

  Category.findByIdAndRemove(req.params.id,err=>{
    if(err){
      console.log(err);
    }
    else{
      res.send({
        success:'Category deleted! Please refresh the page to see changes occured'
      });
    }
  });
});

//Exports
module.exports=router;