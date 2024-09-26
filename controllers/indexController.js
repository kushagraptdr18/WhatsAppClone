
const userModel = require('../models/userModel')

var chatModel = require('../models/chatModel');

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')


module.exports.loginPageController=function(req,res){
    res.render("userLogin")
}

module.exports.registrationPageController = function(req,res){
    res.render("registrationPage")
}


module.exports.loginPageController = function(req,res){
    res.render("userLogin");
}
module.exports.postRegistrationPageController = async function(req,res){
    
let{email,password,name}=req.body;

    try{
    
     let user =  await  userModel.findOne({email});

     if(user) return res.send("you aleready have an account..");

     let salt= await bcrypt.genSalt(10)
     let hashed = await bcrypt.hash(password,salt);

     user = await userModel.create({
        name,email,image:req.file.filename,password:hashed
     })

     console.log(user);
     
  let token = jwt.sign({email: user.email, id:user._id},"shhh")
  res.cookie("token",token);
  res.redirect("/dashboard");
}

catch(err){
    res.send(err.message)
}





}

module.exports.postLoginPageControler = async function(req,res){
    let{email,password} = req.body;

    let user = await userModel.findOne({email});
    if(!user)return res.send("youd don't have account");

    let result = await bcrypt.compare(password,user.password)
      
    if(result){
      
        let token = jwt.sign({email: user.email, id:user._id},"shhh")
        res.cookie("token",token);
        res.redirect("/dashboard")
      }
      else{
        res.send("Something went wrong")
      }

}

module.exports.logoutPageController = async function(req,res){
    let updatedUser =  await userModel.findOneAndUpdate({_id:req.params.id},{$set:{isOnline:"1"}},{ returnOriginal: false })
    
    res.cookie("token","");
    res.redirect("/login")
}

module.exports.dashboardPageController = async function(req,res){

    var user = req.user;
    // console.log(user);    
    var alluser =  await userModel.find({_id:{$nin:[req.user._id]}})
    res.render("dashboard",{user,alluser});

}


module.exports.saveChatPageController = async function(req,res){
    try{
        var chat = await chatModel.create({
            sender_Id : req.body.sender_Id,
            receiver_Id : req.body.receiver_Id,
            message: req.body.message
        }) 

        await chat.save();

        console.log(chat);
        
        res.status(200).send({success:true,msg:'Chat inserted successfully',data:chat});
    }
    catch(err){
        res.send(err.message)
    }

}