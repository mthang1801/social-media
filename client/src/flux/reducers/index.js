import {combineReducers} from "redux";
import alertsReducer from "./alertsReducer";
import authReducer from "./authReducer";
export default combineReducers({
  alerts : alertsReducer,
  auth : authReducer
})
