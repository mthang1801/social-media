import {combineReducers} from "redux";
import alertsReducer from "./alertsReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
export default combineReducers({
  alerts : alertsReducer,
  auth : authReducer,
  profile : profileReducer,
  post : postReducer
})
