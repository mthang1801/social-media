const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const ProfileModel = require("../../models/Profile");
const UserModel = require("../../models/User");

/**
 * @route GET api/profile/me
 * @desc get current profile
 * @access private
 */
router.get("/me", auth, async (req, res) => {
  try {    
    let profile = await ProfileModel.findOne({user : req.user.id}).populate("users", ["name", "avatar"]);    
    if(!profile){
      return res.status(400).json({msg : "There is no profile for user"});
    }
    return res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({msg : error})
  }
})

/**
 * @route /api/profile
 */
router.post(
  "/",
  auth,
  [
    check("status", "Status is required").not().isEmpty(),
    check("skills", "Skills are required").not().isEmpty(),
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }  
    let {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;    
    //Build profile Object
    let profileFields = {} ;
    profileFields.user = req.user.id ; 
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(status) profileFields.status = status;
    if(skills) profileFields.skills = skills.split(",").map(skill => skill.trim());
    if(bio) profileFields.bio = bio;
    if(githubusername) profileFields.githubusername = githubusername;
    
    //Build social object
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;
    try {
      //check if prifile user has existed or not
      let profile= await ProfileModel.findOne({user : req.user.id});
      if(profile){
        //Update profile
        profile = await ProfileModel.findOneAndUpdate(
          { user: req.user.id },
          { $set : profileFields, updatedAt : new Date() },
          { new: true }
        );       
        return res.status(200).json(profile);
      }
      
      //Create new Profile
      profile = await ProfileModel.create(profileFields);

      return res.status(200).json(profile);
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ errors: [error.message] });
    }
  }
);

/**
 * @route api/profile
 * @desc get all profiles
 * @access public
 */
router.get("/",  async(req, res) => {
  try {
    let profiles = await ProfileModel.find().populate("user",[ "name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    return res.status(400).json({msg : error.message});
  }
});

/**
 * @route api/profile/user/id
 * @desc get profile by userId
 * @access public
 */
router.get("/user/:userId", async(req, res) => {
  try {   
    let profile = await ProfileModel.findOne({user :  req.params.userId}).populate("user", ["name", "avatar"]);
    if(!profile){
      return res.status(404).json({msg : "Profile not found"});
    }
    return res.status(200).json({profile});
  } catch (err) {
    console.log(err)
    if(err instanceof require("mongoose").Error.CastError){
      return res.status(404).json({msg : "Profile not found"});
    }
    return res.status(500).send("Server error");
  }
});

/**
 * @route DELETE api/profile
 * @desc delete profile, user & posts
 * @access public
 */
router.delete("/", auth, async(req, res) => {
  try {   
    //@todo - remove users posts

    //remove profile
    await ProfileModel.findOneAndDelete({user : req.user.id});
    //remove user
    await UserModel.findByIdAndDelete(req.user.id);
    res.json({msg : "User deleted"});
  } catch (err) {
    console.log(err.message)
    return res.status(500).send("Server error");
  }
});

/**
 * @route PUT api/profile/experience
 * @desc Add profile experience
 * @access Private
 */
router.put("/experience", auth, [
  check("title", "Title is required").not().isEmpty(),
  check("company", "Company is required").not().isEmpty(),
  check("from", "From is required").not().isEmpty()
], async (req, res)=>{
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors : errors.array()});
  }
  let {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body ;
  let newExpericence = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
   };
   try {
     let profile = await ProfileModel.findOne({user : req.user.id});
     profile.experience.unshift(newExpericence);
     await profile.save();
     return res.status(200).json({profile});
   } catch (error) {
     console.log(error);
     return res.status(500).json({errors : [error.message]});
   }
});

/**
 * @route PUT api/profile/experience/experienceId
 * @desc update profile experience by experienceId
 * @access Private
 */
router.put("/experience/:expId", auth, [
  check("title", "Title is required").not().isEmpty(),
  check("company", "Company is required").not().isEmpty(),
  check("from", "From is required").not().isEmpty()
], async (req, res)=>{
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors : errors.array()});
  };
  let {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body ;
  let updateExpericence = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
   };
   try {
     let profile = await ProfileModel.findOne({user: req.user.id});
     if(!profile){
       return res.status(400).json({msg : "Not found"});
     }
     let index = profile.experience.findIndex( expItem => expItem._id == req.params.expId);
     profile.experience.set(index, updateExpericence);
     profile.save();
     return res.status(200).json({profile});
   } catch (error) {
     console.log(error.message);
     return res.status(500).send("Server error");
   }
});

/**
 * @route DELETE api/profile/experience/:expId
 * @desc delete experiece by expId
 * @access private
 */
router.delete("/experience/:expId", auth, async(req, res) => {
  try {
    let profile = await ProfileModel.findOne({user : req.user.id});
    //get remove index 
    let index = profile.experience.findIndex(expItem => expItem._id == req.params.expId);
    if(index == -1){
      return res.status(400).json({msg : "Not found to delete"});
    }
    profile.experience.splice(index,1);
    profile.save();
    return res.status(200).json({profile});
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

/**
 * @route PUT api/profile/education
 * @desc Add profile education
 * @access Private
 */
router.put("/education", auth, [
  check("school", "School is required").not().isEmpty(), 
  check("from", "From is required").not().isEmpty(),
], async (req, res)=>{
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors : errors.array()});
  }
  let {
    school,
    fieldtostudy,
    degree,
    location,
    from,
    to,
    current  
  } = req.body ;
  let newEducation = {
    school,
    location,
    fieldtostudy,
    degree,
    from,
    to,
    current 
   };
   try {
     let profile = await ProfileModel.findOne({user : req.user.id});
     profile.education.unshift(newEducation);
     await profile.save();
     return res.status(200).json({profile});
   } catch (error) {
     console.log(error);
     return res.status(500).send("Server error");
   }
});

/**
 * @route PUT api/profile/education/eduId
 * @desc update profile education by eduId
 * @access Private
 */
router.put("/education/:eduId", auth, [
  check("school", "School is required").not().isEmpty(),
  check("from", "From is required").not().isEmpty()
], async (req, res)=>{
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors : errors.array()});
  };
  let {
    school,
    location,
    fieldtostudy,
    degree,
    from,
    to,
    current
  } = req.body ;
  let updateEducation = {
    school,
    location,
    fieldtostudy,
    degree,
    from,
    to,
    current
   };

   try {
     let profile = await ProfileModel.findOne({user: req.user.id});
     if(!profile){
       return res.status(400).json({msg : "Not found"});
     }
    
     let index = profile.education.findIndex( expItem => expItem._id == req.params.eduId);
     profile.education.set(index, updateEducation);
     profile.save();
     return res.status(200).json({profile});
   } catch (error) {
     console.log(error.message);
     return res.status(500).send("Server error");
   }
});

/**
 * @route DELETE api/profile/education/:eduId
 * @desc delete education item by eduId
 * @access private
 */
router.delete("/education/:eduId", auth, async(req, res) => {
  try {
    let profile = await ProfileModel.findOne({user : req.user.id});
    //get remove index 
    let index = profile.education.findIndex(expItem => expItem._id == req.params.eduId);
    if(index == -1){
      return res.status(400).json({msg : "Not found to delete"});
    }
    profile.education.splice(index,1);
    profile.save();
    return res.status(200).json({profile});
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

router.get("/github/:username", async (req, res) => {
  try{
    const options = {
      uri : `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get("github_clientId")}&client_secret=${config.get("github_clientSecret")}`,
      method : "GET",
      headers : { "user-agent" : "node.js"}
    }
    request(options, (err, response, body) => {
      if(err) console.log(err);
      if(response.statusCode !== 200){
        return res.status(404).json({msg : "No github profile found"});
      }
      res.status(200).json(JSON.parse(body));
    })
  }catch(error){
    console.log(error);
    return res.status(500).send("Server error");
  }
})
module.exports = router;
