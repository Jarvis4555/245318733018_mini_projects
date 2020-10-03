const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HSchema = new Schema({
    hId:{
        type:String,
        required:[true,'Id field is required']
    },
    name:{
        type:String,
        required:[true,'Id field is required']
    },
});
const hospital = mongoose.model('Hospital',HSchema);
module.exports = hospital;