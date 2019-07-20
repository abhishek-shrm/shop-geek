var mongoose=require('mongoose');

//Product Schema
var UserDetailsSchema=mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    lowercase:true,
    unique:true
  },
  mobile:{
    type:Number,
    unique:true
  },
  address:{
    type:String,
    required:true
  },
  pinCode:{
    type:Number
  }

});

var Product=module.exports=mongoose.model('UserDetails',UserDetailsSchema);