import React from 'react';
import './App.css';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import {loadUser} from "./flux/actions/auth";
function App() {
  React.useEffect(() => {
    store.dispatch(loadUser());
  },[])
 const {loading, isAuthenticated} = store.getState().auth;
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>       
        <Route exact path="/" ><Landing/></Route>
        <section className="container">
          <Alert/>
          <Switch>
            <Route path="/login"><Login/></Route> 
            <Route path="/register"><Register/></Route>
          </Switch>
        </section>
      </Router>
    </Provider>
    
  );
}


export default App;
