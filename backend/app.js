var express=require('express');
var path=require('path');
var bodyParser= require('body-parser');
var cors=require('cors');
var mongoose=require('mongoose');
var session=require('express-session');
var expressValidator=require('express-validator');

//Init app
var app=express();

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({
  secret:'secret developer',
  resave:true,
  saveUninitialized:true,
  //cookie:{secure:true}
}));
app.use(cors());

require('dotenv').config();

//Connect to DB
mongoose.connect(process.env.mongoURI,{ useNewUrlParser: true });
var db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

//models
var Category=require('./models/category');


//Routes
var adminCategory=require('./routes/adminRoutes/adminCategory');
var addCategory=require('./routes/adminRoutes/addCategory');
var editCategory=require('./routes/adminRoutes/editCategory');
var deleteCategory=require('./routes/adminRoutes/deleteCategory');

//Middlewares
app.use('/admin/categories',adminCategory);
app.use('/admin/add-category',addCategory);
app.use('/admin/edit-category',editCategory);
app.use('/admin/delete-category',deleteCategory);


//Start the server
var port=3000;
app.listen(process.env.PORT||port,()=>{
  console.log('Server started on port '+port)
});