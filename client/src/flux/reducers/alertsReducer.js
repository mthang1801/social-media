import * as types from "../actions/types";

const inititalState = [] ; 

export default function(state=inititalState, action){
  const {payload, type} = action ;
  switch(type){
    case types.SET_ALERT :
      return [...state, payload];
    case types.REMOVE_ALERT : 
      return state.filter(alert => alert.id !== payload);
    default : return state; 
  }
}
