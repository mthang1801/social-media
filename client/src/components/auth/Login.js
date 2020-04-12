import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
const Login = () => {
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
      let data = JSON.stringify({email, password});
      let config = {
        headers : {
          "Content-Type": "application/json"
        }
      }
      let user = await axios.post("/api/auth/login", data , config);
      console.log(user);
    } catch (error) {
      console.log(error.response);
    }
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

export default Login;
