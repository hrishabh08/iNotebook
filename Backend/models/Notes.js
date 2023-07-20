const mongoose = require('mongoose');
const {Schema}  = mongoose;
const NotesScheme  =  new Schema({
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
},

    title:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
        unique : true,
    },
    tag:{
        type:String,
        required: true,
    },
    Date:{
        type:Date,
        required: true,
        default : Date.now
    },
})

module.exports = mongoose.model('Notes',NotesScheme);