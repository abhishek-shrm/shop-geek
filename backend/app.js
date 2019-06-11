var express=require('express');
var path=require('path');
var bodyParser= require('body-parser');
var cors=require('cors');
var mongoose=require('mongoose');

//Init app
var app=express();

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(cors());

require('dotenv').config();

//Connect to DB
mongoose.connect(process.env.mongoURI,{ useNewUrlParser: true });
var db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

app.get('/',(req,res)=>{
  res.send('server is running');
});

//Start the server
var port=3000;
app.listen(process.env.PORT||port,()=>{
  console.log('Server started on port '+port)
});