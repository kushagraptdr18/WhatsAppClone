const mongoose = require('mongoose');

console.log((process.env.MONGO_DB_URI));

mongoose.connect(process.env.MONGO_DB_URI).then(function(){
    console.log("Database connected"); 
}).catch(function(err){
    console.log(err);  
})

let db = mongoose.connection;

module.exports=db;