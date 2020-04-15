import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {login} from "../../flux/actions/auth";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const Login = ({login, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const {email, password} = formData;

  const handleChange = e => {
    setFormData({...formData, [e.target.name] : e.target.value});
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {      
      login({email, password});
    } catch (error) {
      console.log(error);
    }
  }
  //Redirect if isAuthenticated is true
  if(isAuthenticated){
    return <Redirect to="/dashboard"></Redirect>
  }
  return (
    <>
      <h1 class="large text-primary">Sign In</h1>
      <p class="lead"><i class="fas fa-user"></i> Sign into Your Account</p>
      <form class="form" onSubmit={onSubmit}>
        <div class="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"           
            autoComplete="email"
            onChange={handleChange}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="new-password"
            onChange={handleChange}
            required
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Login" />
      </form>
      <p class="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  )
};

const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
})

Login.propTypes = {
  login : PropTypes.func.isRequired,
  isAuthenticated : PropTypes.bool.isRequired
}

export default connect(mapStateToProps, {login})(Login);
