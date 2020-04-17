import * as types from "./types";
import axios from "axios";
import {setAlert } from "./alerts";
export const getPosts = () =>  async dispatch => {
  try {
    let res = await axios.get("/api/posts");
    dispatch({
      type : types.GET_POSTS,
      payload : res.data
    })
  } catch (error) {
    dispatch({
      type : types.POST_ERROR,
      payload : {msg : error.response.statusText, status : error.response.status}
    })
  }
}

//Add likes
export const addLike = postId =>  async dispatch =>{
  try {
    let res = await axios.put(`/api/posts/like/${postId}`);
    
    dispatch({
      type : types.UPDATE_LIKES,
      payload : {id : postId , unlikes : res.data.unlikes, likes : res.data.likes}
    })
    
  } catch (error) {
    dispatch({
      type : types.POST_ERROR,
      payload : {msg: error.response.statusText, status : error.response.status}
    })
  }
}

//Unlike
export const addUnlike = postId =>  async dispatch =>{
  try {
    let res = await axios.put(`/api/posts/unlike/${postId}`);       
    dispatch({
      type : types.UPDATE_LIKES,
      payload : {id : postId,  unlikes : res.data.unlikes, likes : res.data.likes }
    })    
  } catch (error) {
    
    dispatch({
      type : types.POST_ERROR,
      payload : {msg: error.response.statusText, status : error.response.status}
    })
  }
};

//Delete post
export const deletePost = postId =>  async dispatch =>{
  try {
    let res = await axios.delete(`/api/posts/${postId}`);       
    dispatch({
      type : types.DELETE_POST ,
      payload : {id : postId}
    })    
  } catch (error) {
    dispatch({
      type : types.POST_ERROR,
      payload : {msg: error.response.statusText, status : error.response.status}
    })
  }
}

//Add post
export const addPost = text => async dispatch =>{
  try {
    const config = {
      headers : {
        "Content-Type": "application/json"
      }
    };
    
    let res = await axios.post(`/api/posts`, {text}, config);   
    dispatch({
      type : types.ADD_POST,
      payload : res.data 
    })

    dispatch(setAlert("New Post has been created", "success"))
    return true;
  } catch (error) {
    dispatch({
      type : types.POST_ERROR,
      payload : {msg: error.response.statusText, status : error.response.status}
    })
  }
}

//Get post 
export const getPost = postId => async dispatch => {
  try {
    let res = await axios.get(`/api/posts/${postId}`);
    dispatch({
      type : types.GET_POST,
      payload : res.data
    })
  } catch (error) {
    dispatch({
      type : types.POST_ERROR,
      payload : {msg: error.response.statusText, status : error.response.status}
    })
  }
}

//Add comment
export const addComment = (comment,postId) => async dispatch => {
  try {
    const config = {
      headers : {
        "Content-Type": "application/json"
      }
    }
    let res = await axios.post(`/api/posts/comment/${postId}`, {text : comment}, config);
    dispatch({
      type : types.ADD_COMMENT,
      payload : res.data
    })
    dispatch(setAlert("Add new comment", "success"))
  } catch (error) {
    dispatch({
      type : types.POST_ERROR,
      payload : {msg: error.response.statusText, status : error.response.status}
    })
  }
}
//Delete comment
export const deleteComment = (commentId, postId) => async dispatch => {
  try {
    console.log(commentId, postId)  
    let res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);  
    dispatch({
      type : types.DELETE_COMMENT,
      payload : res.data
    })
    dispatch(setAlert("Comment has been Deleted", "success"))
  } catch (error) {
    dispatch({
      type : types.POST_ERROR,
      payload : {msg: error.response.statusText, status : error.response.status}
    })
  }
}
