const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    sender_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    receiver_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    message:{
        type:String,
        required:true
    }

},
    {timestamp:true}
    
)

module.exports = mongoose.model('Chat',chatSchema)