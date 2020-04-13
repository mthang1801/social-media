import * as types from "../actions/types";

const inititalState = {
  token : localStorage.getItem("token"),
  isLoading : true , 
  isAuthenticated : false ,
  user : null 
}

export default function(state=inititalState, action){
  const {type, payload} = action;
  switch(type){
    case types.USER_LOADED : 
      return {
        ...state,
        ...payload,
        isLoading: false ,
        isAuthenticated : true ,       
      }
    case types.REGISTER_SUCCESS : 
    case types.LOGIN_SUCCESS : 
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isLoading: false ,
        isAuthenticated : true ,      
      }
    case types.REGISTER_FAIL : 
    case types.AUTH_ERROR : 
    case types.LOGIN_FAIL :
    case types.LOGOUT :
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
