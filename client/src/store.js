import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./flux/reducers";

const initState = {} ; 
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
