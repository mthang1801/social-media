import React from 'react'
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
const DashboardActions = props => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-primary'>
        <i className='fas fa-user-circle'></i> Edit Profile
      </Link>
      <Link to='/add-experience' className='btn btn-primary'>
        <i className='fab fa-black-tie'></i> Add Experience
      </Link>
      <Link to='/add-education' className='btn btn-primary'>
        <i className='fas fa-graduation-cap '></i> Add Education
      </Link>
    </div>
  );
}

DashboardActions.propTypes = {

}

export default connect()(DashboardActions);
