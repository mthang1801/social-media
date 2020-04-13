import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../flux/actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
const Dashboard = ({
  auth: { isAuthenticated, isLoading, user },
  profile: { profile, loading },
  getCurrentProfile,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }
  return !profile && loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome{" "}
        {user && user.name ? user.name : ""}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
        </>
      ) : (
        <>
          <p>You have not set up profile, please add some info.</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
