const express = require('express');
const route = express.Router();
const path=require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + path.extname(file.originalname))
    }
  })

  const upload = multer({ storage: storage })


const { 
  loginPageController, registrationPageController, postRegistrationPageController, dashboardPageController, postLoginPageControler, logoutPageController, saveChatPageController } = require('../controllers/indexController');


const {isLoggedIn } = require('../middelwares/auth-middleware')

route.get("/",loginPageController)
route.get('/register',registrationPageController)
route.post("/register",upload.single('image'),postRegistrationPageController)
route.get("/dashboard",isLoggedIn,dashboardPageController)
route.get("/login",loginPageController)
route.post("/userLogin",postLoginPageControler)
route.get("/logout/:id",logoutPageController)

route.post("/saveChat",saveChatPageController)





module.exports=route;