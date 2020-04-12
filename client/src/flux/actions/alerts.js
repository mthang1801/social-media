import * as types from "./types";
import {v4 as uuid} from "uuid";
export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid();
  dispatch({
    type : types.SET_ALERT,
    payload : {id, msg, alertType}
  })

  setTimeout(() => dispatch({
    type : types.REMOVE_ALERT,
    payload : id 
  }), 7000);
}
