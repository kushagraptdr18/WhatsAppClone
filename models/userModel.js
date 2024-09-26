const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isOnline:{
        type:String,
        default:'0'
    },
    image:{
        type:String,
        required:true
    }
},
    {timestamp:true}
    
)

module.exports = mongoose.model('User',userSchema)