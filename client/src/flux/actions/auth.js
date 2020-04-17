import * as types from "../actions/types";
import axios from "axios";
import {setAlert} from "./alerts";
import setAuthToken from "../../utils/setAuthToken";
//Load User
export const loadUser = () => async dispatch =>{  
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }
  try {
    let res = await axios.get("/api/auth/user");    
    dispatch({
      type : types.USER_LOADED,
      payload : res.data
    })
    
  } catch (error) {
    dispatch({
      type : types.AUTH_ERROR
    })
  }
}

//Register
export const register = ({name, email, password}) => async dispatch => {
  const config = {
    headers : {
      "Content-Type": "application/json"
    }
  }
  const body = JSON.stringify({name, email, password});
  try {
    let response = await axios.post("/api/users", body, config);
    dispatch(setAlert("Sign up successfully", "success"));
    dispatch({
      type : types.REGISTER_SUCCESS,
      payload : response.data
    })
  
  } catch (error) {
    console.log(error.response);
    dispatch({
      type : types.REGISTER_FAIL
    })
    let errorsList = error.response.data.errors;
    errorsList.length && errorsList.forEach(err => {    
      dispatch(setAlert(err.msg, "danger"));     
    })
  }
}

//Login
export const login = ({email, password}) => async dispatch => {
  const config = {
    headers : {
      "Content-Type": "application/json"
    }
  }

  const body = JSON.stringify({ email, password});
  try {
    let response = await axios.post("/api/auth/login", body, config);   
    console.log(response.data);
    dispatch({
      type : types.LOGIN_SUCCESS,
      payload : response.data
    })
    dispatch(loadUser());
  } catch (error) {
    console.log(error.response);
    dispatch({
      type : types.LOGIN_FAIL
    })
    let errorsList = error.response.data.errors;
    errorsList.forEach(err => {    
      dispatch(setAlert(err.msg, "danger"));     
    })
  }
}

//Logout
export const logout = () => dispatch => {
  dispatch({
    type : types.LOGOUT
  });
  setAuthToken(null);
  //clear profile
  dispatch({
    type : types.CLEAR_PROFILE
  })
}
