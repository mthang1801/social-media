const express = require('express');
const router = express.Router();
const {check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const config = require("config");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/User");
/**
 * @route /api/users
 * @desc get users
 * @access public
 */
router.post("/", [
  check("name", "Name is required, at least 6 characters and not over 20 character")
    .isLength({min: 6, max : 20}),
  check("email", "Email is invalid")
    .isEmail(),
  check("password", "password is invalid, at least 6 character")
    .isLength({min: 6})
] , async(req,res) => {
  let errors = validationResult(req);
  if(!errors.isEmpty()){    
    return res.status(400).json({errors : errors.array()});
  }
  try {
    //See if user has existed
    let {name, email, password} = req.body ; 
    let user = await UserModel.findOne({email});
    if(user){
      return res.status(400).json({errors : [{ msg : "Email has existed" }]});
    }
    let avatar = gravatar.url(email, { s : "200", r : "pg", d : "mm"});
    user = new UserModel({
      name,
      email,
      password,
      avatar
    })
    let salt = await bcrypt.genSalt(config.get("saltRound"));
    user.password = await bcrypt.hash(password, salt);
    await user.save()

    const payload = {
      user: {
        id : user._id 
      }
    }

    let token = await jwt.sign(payload, config.get("JWT_SECRET"), { expiresIn: 3600 * 24 * 1000});

    return res.status(200).send({token, user});
  } catch (error) {
    return res.status(400).json({msg : error});
  }
});

module.exports = router; 
