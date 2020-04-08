const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const {check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/User");
router.get("/user", auth, async (req,res) => {
  try {
    let {id} = req.user; 
    let user = await UserModel.findById(id).select({"password" : 0});
    return res.status(200).json({user});
  } catch (error) {
    return res.status(500).send("Server error");
  }
})

router.post("/login",[
  check("email", "Email is invalid")
    .isEmail(),
  check("password", "Password is invalid, at least 6 characters")
    .isLength({min : 6})
] ,async (req, res) => {
  
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors : errors.array()})
  }
  const {email, password} = req.body ;
  try {
    let user = await UserModel.findOne({email});
    user = user.toObject();
    if(!user){
      return res.status(400).json({errors : [{msg: "Email or password is incorrect"}]});
    }
    let isMatch = await bcrypt.compare(password, user.password); 
    if(!isMatch){
      return res.status(400).json({errors : [{msg: "Email or password is incorrect"}]});
    }
    let payload = {
      user : {
        id : user._id 
      }
    }
    let token = await jwt.sign(payload, config.get("JWT_SECRET"), { expiresIn: 3600 * 24 * 1000});       
    delete user.password;
    return res.status(200).json({token, user})
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({msg : [{"msg" : "server error"}]});
  }
})
module.exports = router; 