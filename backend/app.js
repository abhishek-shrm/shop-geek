var express=require('express');
var path=require('path');
var bodyParser= require('body-parser');
var cors=require('cors');

//Init app
var app=express();

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
  res.send('server is running');
});

//Start the server
var port=3000;
app.listen(process.env.PORT||port,()=>{
  console.log('Server started on port '+port)
});