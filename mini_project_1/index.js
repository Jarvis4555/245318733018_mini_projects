const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//connecting server file for awt
let server=require('./server');
let config=require('./config');
let middleware=require('./middleware');

mongoose.set('useFindAndModify', false);
mongoose.connect(
    'mongodb://127.0.0.1:27017/Mini_Project_1',
    { useUnifiedTopology: true , useNewUrlParser: true }
    );
mongoose.Promise = global.Promise;



// app.use(bodyParser.json());


// app.use('/api',require('./routes/app'));

app.use(function(err,req,res,next){

    res.status(422).send({error:err.message});
    res.status(403).send({error:err.message});
    res.status(400).send({error:err.message});
});

// app.get('/hello',(req,res) =>{
//     res.send('hello world');
// }) 

//app.listen(3000);
 
