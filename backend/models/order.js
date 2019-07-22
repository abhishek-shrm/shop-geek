var mongoose=require('mongoose');

//Order Schema
var OrderSchema=mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  orders:{
    type:Array,
    required:true
  }
});

var Product=module.exports=mongoose.model('Order',OrderSchema);