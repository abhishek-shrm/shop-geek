var mongoose=require('mongoose');

//Cart Schema
var CartSchema=mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  cart:{
    type:Array,
    required:true
  },
  cartCount:{
    type:Number,
    required:true
  }
});

var Product=module.exports=mongoose.model('Cart',CartSchema);