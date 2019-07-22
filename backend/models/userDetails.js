var mongoose=require('mongoose');

//User Details Schema
var UserDetailsSchema=mongoose.Schema({
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
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
    required:true
  },
  address:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  pinCode:{
    type:Number
  }
});

var Product=module.exports=mongoose.model('UserDetails',UserDetailsSchema);