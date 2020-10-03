const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()


//connecting server file for awt
let server=require('./server');
let config=require('./config');
let middleware=require('./middleware');

mongoose.set('useFindAndModify', false);
mongoose.connect(
    process.env.DB_Connect,
    { useUnifiedTopology: true , useNewUrlParser: true },
    () => console.log("Connected to db!"));
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
 
