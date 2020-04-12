import * as types from "../actions/types";
import axios from "axios";
import {setAlert} from "./alerts";
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
