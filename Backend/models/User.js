const mongoose = require('mongoose');
const {Schema}  = mongoose;
const UserScheme  =  new Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique : true,
    },
    password:{
        type:String,
        required: true,
    },
    Date:{
        type:Date,
        required: true,
        default : Date.now
    },
})

module.exports = mongoose.model('User',UserScheme);