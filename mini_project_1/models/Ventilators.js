const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VSchema = new Schema({
    hId:{
        type:String,
        required:[true,'Id field is required']
    },
    ventilatorId:{
        type:String,
        required:[true,'Id field is required']
    },
    status:{
        type:String,
        required:[true,'Id field is required']
    },
    name:{
        type:String,
        required:[true,'Id field is required']
    },

});
const ventilator = mongoose.model('Ventilator',VSchema);
module.exports = ventilator;