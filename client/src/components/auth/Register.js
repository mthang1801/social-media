import React, {useState, Fragment} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const {name, email, password, confirm_password} = formData;

  const handleChange = e => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  const onSubmit = async e => {    
    e.preventDefault();
    if(password !== confirm_password){
      console.log("not match");
    }else{
      let data = JSON.stringify({name, email, password});
      let config = {
        headers : {
          "Content-Type" : "application/json"
        }
      }
      let user =  await axios.post("/api/users", data , config);
      console.log(user);
    }
  }
  return (
    <>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={handleChange}
            autoComplete="username"
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            autoComplete='new-password'
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='confirm_password'
            minLength='6'
            value={confirm_password}
            autoComplete='new-password'
            onChange={handleChange}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </>
  );
}

export default Register;
