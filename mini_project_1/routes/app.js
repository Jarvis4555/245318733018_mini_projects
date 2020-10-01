const express = require('express');
const { db } = require('../models/Hospital');
const router = express.Router();
const Hospital = require('../models/Hospital');
const Ventilator = require('../models/Ventilators');
const middleware = require('../middleware');

//Read details of Hospital
router.get('/getH',middleware.checkToken,(req,res,next)=>{
    db.collection("hospitals").find({}).toArray( function(err, result) {
        if (err) throw err;
        res.send(result);
        console.log("Reading details of Hospital");
        console.log(result);
    });
});

//Read details of Ventilators
router.get('/getV',middleware.checkToken,(req,res,next)=>{
    db.collection("ventilators").find({}).toArray( function(err, result) {
        if (err) throw err;
        res.send(result);
        console.log("Reading details of Ventilators");
        console.log(result);
    });
});

//Add new hospitals
router.post('/addH',middleware.checkToken,(req,res,next)=>{
    Hospital.create(req.body).then(function(hospital){
          res.send(hospital);
          console.log("Added new hospital");
          console.log(hospital);
      }).catch(next);
});

//Add new ventilators
router.post('/addV',middleware.checkToken,(req,res,next)=>{
    Ventilator.create(req.body).then(function(ventilator){
            res.send(ventilator);
            console.log("Added new ventilator");
            console.log(ventilator);
         }).catch(next);
});

//Update ventilator details
router.put('/update/:id',middleware.checkToken,(req,res,next)=>{
   Ventilator.updateOne({ventilatorId: req.params.id},req.body).then((ventilator)=>{
       res.send({ventilator});
       console.log("Updating ventilator details");
       console.log(ventilator);
    }).catch(next);
});

//Search hospital by name
router.get('/get/:name',middleware.checkToken,(req,res,next)=>{
    db.collection("hospitals").findOne({name: req.params.name}).then(function(hospital){
        res.send(hospital);
        console.log("Searching hospital by name");
        console.log(hospital);
    });
});

//Search ventilators by status and hospital name
router.get('/get/:name/:status',middleware.checkToken,(req,res,next)=>{
     db.collection("ventilators").find({name: req.params.name,status: req.params.status}).toArray().then(function(ventilator){
          res.send(ventilator);
          console.log("Searching ventilators by status and hospital name");
          console.log(ventilator);
          
          
      });
});

//Delete Ventilator by Vent ID
router.delete('/delete/:id',middleware.checkToken,(req,res,next)=>{
    db.collection("ventilators").deleteOne({ventilatorId: req.params.id}).then(function(ventilator){
        res.send(ventilator);
        console.log("Ventilator has been deleted successfully")
        
    });
});
//console.log("run")

module.exports = router;