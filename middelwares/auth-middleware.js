const jwt = require('jsonwebtoken');
const usermodel = require('../models/userModel');


module.exports.isLoggedIn = async function(req,res,next){

    if(req.cookies.token){

        try{
        let decoded = jwt.verify(req.cookies.token, "shhh");
        let user = await usermodel.findOne({email:decoded.email})
        req.user = user;
        next();
        }
        catch(err){
         return res.redirect("/login");
        }
    }

    else{
        return res.redirect("/login")
    }
}
