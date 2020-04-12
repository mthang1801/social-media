import * as types from "../actions/types";

const inititalState = {
  token : localStorage.getItem("token"),
  isLoading : false , 
  isAuthenticated : false ,
  user : null 
}

export default function(state=inititalState, action){
  const {type, payload} = action;
  switch(type){
    case types.REGISTER_SUCCESS : 
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isLoading: false ,
        isAuthenticated : true ,      
      }
    case types.REGISTER_FAIL : 
      localStorage.removeItem("token");
      return {
        ...state,
        token : null,
        isLoading: false,
        isAuthenticated: false,
        user : null
      }
    default : return state; 
  }
}
