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
    console.log(data);
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
