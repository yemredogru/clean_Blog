const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const photoSchema=new Schema({
    title:String,
    detail:String,
    dateCreated:{
        type:Date,
        default:Date.now
    }
});

const photo=mongoose.model('Photo',photoSchema);

module.exports=photo;