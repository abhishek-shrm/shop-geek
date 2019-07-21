var mongoose=require('mongoose');

//Product Schema
var UserSchema=mongoose.Schema({
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
  password:{
    type:String,
    required:true
  },
  admin:{
    type:Number,
    required:true
  }
});

var Product=module.exports=mongoose.model('User',UserSchema);