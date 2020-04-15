import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../flux/actions/profile";
import { withRouter, Link } from "react-router-dom";
const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = React.useState({
    school: "",
    fieldtostudy: "",
    degree: "",
    from: "",
    to: "",
    location: "",
    current: false,
  });

  const {
    school,
    fieldtostudy,
    degree,
    from,
    to,
    location,
    current,
  } = formData;

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "current") {
      value = e.target.checked;
    }
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
  };
  return (
    <>
      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <i className='fas fa-graduation-cap'></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            value={school}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            value={degree}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Field Of Study' name='fieldtostudy' value={fieldtostudy} onChange={handleChange}/>
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input type='date' name='from' value={from} onChange={handleChange}/>
        </div>
        <div className='form-group'>
          <p>
            <input type='checkbox' name='current' checked={current} onChange={handleChange} /> Current School or
            Bootcamp
          </p>
        </div>
        {!current && (
          <div className='form-group'>
          <h4>To Date</h4>
          <input type='date' name='to' value={to} onChange={handleChange} />
          </div>        
        )}       
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
