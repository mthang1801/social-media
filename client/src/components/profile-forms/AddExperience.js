import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../flux/actions/profile";
import { Link, withRouter } from "react-router-dom";
const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = React.useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const { title, company, location, from, to, current, description } = formData;

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
    addExperience(formData, history);
  };
  return (
    <>
      <h1 class='large text-primary'>Add An Experience</h1>
      <p class='lead'>
        <i class='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class='form' onSubmit={onSubmit}>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            value={title}
            onChange={handleChange}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            value={company}
            onChange={handleChange}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={handleChange}
          />
        </div>
        <div class='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={handleChange}
            required
          />
        </div>
        <div class='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              id='current'
              checked={current}
              onChange={handleChange}
            />{" "}
            <label htmlFor='current'>Current Job</label>
          </p>
        </div>
        {!current && (
          <div class='form-group'>
            <h4>To Date</h4>
            <input type='date' name='to' value={to} onChange={handleChange} />
          </div>
        )}

        <div class='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={handleChange}></textarea>
        </div>
        <input type='submit' class='btn btn-primary my-1' value='Submit' />
        <Link class='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
