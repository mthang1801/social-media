const express = require('express');
const router = express.Router();
const PostModel = require("../../models/Post");
const ProfileModel = require("../../models/Profile");
const UserModel = require("../../models/User");
const {check, validationResult} = require("express-validator/check");
const auth = require("../../middleware/auth");

/**
 * @route POST /api/posts
 * @desc Create a post 
 * @access private
 */
router.post("/", auth, [
  check("text", "You need to write before posting").not().isEmpty()
] , async (req, res) => {
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors : errors.array()});
  }
  try {
    let user = await UserModel.findById(req.user.id).select("-password");
    let newPost = {
      user : req.user.id,
      text : req.body.text,
      name : user.name,
      avatar : user.avatar,
    }  
    let post = await new PostModel(newPost).save();
    return res.status(200).json({post});
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

/**
 * @route GET /api/posts
 * @desc get posts
 * @access private
 */
router.get("/", auth, async (req, res) => {
  try {
    let posts = await PostModel.find().sort({date : -1});
    return res.status(200).json({posts})
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

/**
 * @route GET /api/posts/:postId
 * @desc get post by postId
 * @access private
 */
router.get("/:postId", auth, async (req, res) => {
  try {
    let post = await PostModel.findById(req.params.postId );
    if(!post) {
      return res.status(404).json({msg : "Post not found"});
    }
    return res.status(200).json({post})
  } catch (err) {
    console.log(err);
    if(err instanceof require("mongoose").Error.CastError){
      return res.status(404).json({msg : "Post not found"});
    }
    return res.status(500).send("Server error");
  }
});

/**
 * @route DELETE /api/posts/:postId
 * @desc delete post by postId
 * @access private
 */

router.delete("/:id", auth, async (req, res) =>{
  try {
    let post = await PostModel.findById(req.params.id);
    if(!post){
      return res.status(404).json({msg : "Post not found"});
    }
    //Check user
    if(post.user.toString() != req.user.id){
      return res.status(401).json({msg : "User not authorized"});
    }
    await post.remove();

    return res.status(200).json({msg : "Post has been removed"});
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

/**
 * @route PUT /api/posts/like/:id
 * @desc like a post 
 * @access private
 */

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    //Check if the post  has been already liked
    if(post.likes.filter( like => like.user.toString() == req.user.id).length){
      return res.status(400).json({msg : "Post already liked"});
    }
    //check if the post has already unliked
    let unlikeIndex = post.unlikes.findIndex( unlike => unlike.user.toString() == req.user.id);
    if(unlikeIndex != -1){
      post.unlikes.splice(unlikeIndex,1);
    }
    post.likes.unshift({user : req.user.id});
    await post.save();
    return res.status(200).json({post});
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

/**
 * @route PUT /api/posts/unlike/:id
 * @desc unlike a post 
 * @access private
 */
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    //Check if the post  has been already unliked
    if(post.unlikes.filter(unlike => unlike.user.toString() != req.user.id).length){
      return res.status(400).json({msg : "Post already unliked"});
    }
    let likeIndex = post.likes.findIndex( like => like.user.toString() == req.user.id );
    if(likeIndex != -1){
      post.likes.splice(likeIndex, 1);
    }
    post.unlikes.unshift({user : req.user.id});
    await post.save();
    return res.status(200).json({post});
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

/**
 * @route POST /api/posts/comment/:postId
 * @desc  comment a post
 * @access private
 */
router.post("/comment/:postId", auth, [
  check("text", "You need to write before posting comment").not().isEmpty()
] , async (req, res) => {
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors : errors.array()});
  }
  try {
    let user = await UserModel.findById(req.user.id).select("-password");
    let post = await PostModel.findById(req.params.postId);    
    let newComment = {
      user : req.user.id,
      text : req.body.text,
      name : user.name,
      avatar : user.avatar,
    };
    post.comments.unshift(newComment);
    await post.save();
    return res.status(200).json({post});
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

/**
 * @route PUT /api/posts/comment/:postId/:comId
 * @desc  edit comment a post
 * @access private
 */
router.put("/comment/:postId/:comId", auth, [
  check("text", "Text is required").not().isEmpty(),
], async (req, res) => {
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors : errors.array()});
  }
  try {  
    let {postId, comId} = req.params;
    let user = await UserModel.findById(req.user.id);
    let post = await PostModel.findById(postId);
    if(!post){
      return res.status(404).json({msg : "Not found this post"});
    }   
    let commentIndex = post.comments.findIndex( comment => comment.user.toString() == req.user.id && comment._id == comId);
    if(commentIndex==-1){
      return res.status(401).json({msg : "You are not allowed to edit this comment"});
    }
    let updateComment = {
      user : req.user.id,
      text : req.body.text,
      name : user.name,
      avatar : user.avatar,
      updatedAt : new Date()
    }
    post.comments.set(commentIndex, updateComment);
    await post.save();
    return res.status(200).json({post});
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

/**
 * @route DELETE /api/posts/comment/:postId/:comId
 * @desc  delete comment a post
 * @access private
 */
router.delete("/comment/:postId/:comId", auth, async (req, res)=>{
  try {
    let {postId, comId} = req.params;
    let post = await PostModel.findById(postId);
    if(!post){
      return res.status(404).json({msg : "Not found this post"});
    }
    let comment = post.comments.find(comment => comment._id == comId);
    if(comment.user.toString() != req.user.id){
      return res.status(401).json({msg: "User is not allowed to edit this comment"});
    }
    let commentIndex = post.comments.findIndex( comment => comment.user.toString() == req.user.id && comment._id == comId);
    if(commentIndex == -1){
      return res.status(401).json({msg : "Comment not found"});
    }
    post.comments.splice(commentIndex, 1);
    await post.save();
    return res.status(200).json({msg : "Comment is removed"});
  } catch (err) {
    console.log(err);
  }
})
module.exports = router; 
