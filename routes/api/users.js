const express = require('express');
const router = express.Router();
const {check, validationResult} = require("express-validator/check")
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
] ,(req,res) => {
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors);
    return res.status(400).json({errors : errors.array()});
  }
  res.send("User route");
})
module.exports = router; 
