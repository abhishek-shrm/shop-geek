var express=require('express');
var router=express.Router();
var Category=require('../../models/category');
var checkAuth=require('../check-auth');

//GET edit category

router.get('/:id',checkAuth,(req,res)=>{

  Category.findById({_id:req.params.id},(err,cat)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send(cat);
    }
  });
});

//POST edit category
router.post('/:id',checkAuth,(req,res)=>{
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