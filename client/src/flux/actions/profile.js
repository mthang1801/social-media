import  axios from "axios";
import * as types from "./types";
import {setAlert} from "./alerts";

//Get current users profile
export const getCurrentProfile = () => async dispatch =>{
  try {
    let res = await axios.get("/api/profile/me");
    dispatch({
      type : types.GET_PROFILE,
      payload : res.data
    })
  } catch (error) {
    dispatch({
      type : types.PROFILE_ERROR,
      payload : {msg: error.response.statusText, status : error.response.status}
    })
  }
}

//Get all profiles
export const getAllProfiles = () => async dispatch =>{
  dispatch({ type : types.CLEAR_PROFILE});
  try {
   
    let res = await axios.get("/api/profile");
    console.log(res);
    dispatch({
      type : types.GET_PROFILES,
      payload : res.data
    })
  } catch (error) {
    dispatch({
      type : types.PROFILE_ERROR,
      payload : {msg: error.response.statusText, status : error.response.status}
    })
  }
}

//Get profile by ID
export const getProfileById = userId => async dispatch =>{  
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    let res = await axios.get(`/api/profile/user/${userId}`, config);
    dispatch({
      type : types.GET_PROFILE,
      payload : res.data
    })
  } catch (error) {
    dispatch({
      type : types.PROFILE_ERROR,
      payload : {msg: error.response.statusText, status : error.response.status}
    })
  }
}

//Get Github repos
export const getGithubRepos = username => async dispatch =>{  
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    console.log(username);
    let res = await axios.get(`/api/profile/github/${username}`, config);
    dispatch({
      type : types.GET_GITHUB,
      payload : res.data
    })
  } catch (error) {
    dispatch({
      type : types.PROFILE_ERROR,
      payload : {msg: error.response.statusText, status : error.response.status}
    })
  }
}

//Create or update file
export const createProfile = (profile, history, edit=false) => async dispatch => {
  try {
    const config = {
      headers : {
        "Content-Type": "application/json"
      }
    }
    let data = JSON.stringify(profile);
    console.log(data);
    let res = await axios.post("/api/profile", data , config );
    dispatch({
      type : types.GET_PROFILE,
      payload : res.data
    })
    dispatch(setAlert(edit ? "Profile has been updated" : "Profile has been created", "success"));
    if(!edit){
      history.push("/dashboard");
    }    
  } catch (error) {
    dispatch({
      type : types.PROFILE_ERROR,
      payload : {msg: error.response.statusText, status : error.response.status}
    })    
    const errors = error.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
    }
  }
}

//Add experience
export const addExperience = (data, history) => async dispatch => {
  try {
    const config = {
      headers : {
        "Content-Type": "application/json"
      }
    }
    let body = JSON.stringify(data);
   
    let res = await axios.put("/api/profile/experience", body , config );
    dispatch({
      type : types.UPDATE_PROFILE,
      payload : res.data
    })
    dispatch(setAlert("Experience has been added", "success"));    
    history.push("/dashboard");        
  } catch (error) {       
    dispatch({
      type : types.PROFILE_ERROR,
      payload : {msg: error.response.statusText, status : error.response.status}
    })    
    const errors = error.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
    }
  }
}
//Add education
export const addEducation = (data, history) => async dispatch => {
  try {
    const config = {
      headers : {
        "Content-Type": "application/json"
      }
    }
    let body = JSON.stringify(data);    
    let res = await axios.put("/api/profile/education", body , config );
    dispatch({
      type : types.UPDATE_PROFILE,
      payload : res.data
    })
    dispatch(setAlert("Education has been added", "success"));    
    history.push("/dashboard");        
  } catch (error) {
    dispatch({
      type : types.PROFILE_ERROR,
      payload : {msg: error.response.statusText, status : error.response.status}
    })    
    const errors = error.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
    }
  }
}
//Delete Experience
export const deleteExperience = id => async dispatch => {
  try {    
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch(setAlert("Experience has been deleted", "success"));    
    dispatch({
      type : types.UPDATE_PROFILE,
      payload : res.data
    })
  } catch (error) {
    dispatch({
      type : types.PROFILE_ERROR,
      payload : {msg: error.response.statusText, status : error.response.status}
    })        
  }
}
//Delete Education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    console.log(res);
    dispatch(setAlert("Education has been deleted", "success"));    
    dispatch({
      type : types.UPDATE_PROFILE,
      payload : res.data
    })
  } catch (error) {
    dispatch({
      type : types.PROFILE_ERROR,
      payload : {msg: error.response.statusText, status : error.response.status}
    })    
  }
}

//Delete account
export const deleteAccount =  () => async dispatch => {
  if(window.confirm("Are you sure? This can't be undone")){
    try {
      await axios.delete(`/api/profile/`);
      dispatch({
        type : types.CLEAR_PROFILE
      })

      dispatch({
        type : types.ACCOUNT_DELETED
      })
      dispatch(setAlert("Your account has been permanently deleted"))
    } catch (error) {
      dispatch({
        type : types.PROFILE_ERROR,
        payload : {msg: error.response.statusText, status : error.response.status}
      })       
    }
  }
}
