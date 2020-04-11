const jwt = require("jsonwebtoken");
const config = require("config");
const auth = (req, res, next) => {
  //Get token from req.headers
  const token = req.header("x-auth-token");
  //Check if not token 
  if(!token){
    return res.status(400).json({msg : "No token, authorization denied"});
  }
  try {
  //verify token
  let decoded =  jwt.verify(token, config.get("JWT_SECRET"));
  req.user = decoded.user;
  next();
  } catch (error) {
    return res.status(401).json({msg : "Token is invalid"});
  }
}

module.exports = auth;
