import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../flux/actions/profile";
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {    
    getProfileById(match.params.id);
  }, [getProfileById]);
  return profile === null || loading ? (
    <Spinner/>
  ) : (
    <>
      <Link to="/profiles">Back To Profiles</Link>
      {auth.isAuthenticated && !auth.loading && auth.user._id === profile.user._id && (<Link to="/edit-profile" className="btn btnm-primary">Edit Profle</Link>)}
      <div className="profile-grid my-1">
        <ProfileTop profile={profile}/>
        <ProfileAbout profile={profile}/>
        {profile.experience.length ? <ProfileExperience profile={profile}/> : <h4>No Experience credentials</h4>}
        {profile.education.length ?<ProfileEducation profile={profile}/> : <><br/><h4>No Education credentials</h4></>}
        {profile.githubusername &&
          <ProfileGithub username={profile.githubusername}/>         
        }
      </div>
    </>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth : PropTypes.object.isRequired,
  getProfileById : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {getProfileById})(Profile);
