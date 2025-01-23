const express= require("express")
const router= express.Router();
const AuthController=require("../controllers/AuthControllers");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/register",AuthController.register)
router.post("/login",AuthController.login)
router.get("/userDetails",authMiddleware,AuthController.getUserDetails)
router.post("/check-email",AuthController.checkMail)
router.post("/reset-password",AuthController.reset)

module.exports= router; 