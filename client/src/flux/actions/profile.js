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
