import React from 'react';
import './App.css';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
function App() {
  return (
    <Router>
      <Navbar/>
      <Route exact path="/" ><Landing/></Route>
      <section className="container">
        <Switch>
          <Route path="/login"><Login/></Route> 
          <Route path="/register"><Register/></Route>
        </Switch>
      </section>
    </Router>
  );
}

export default App;
