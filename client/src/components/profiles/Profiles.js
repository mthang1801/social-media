import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {getAllProfiles} from "../../flux/actions/profile";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";

const Profiles = ({getAllProfiles, profile : {profiles, loading}}) => {
  useEffect(() => {
    getAllProfiles();
  } , [getAllProfiles])
   
  return loading ? <Spinner/> : (
    <>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with developer     
      </p>
      <div className="profiles">
        {profiles.length ? profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile}/>
          )) : <h2 className="large text-danger">Profiles not found</h2>}
      </div>
    </>
  )
  
    
}

Profiles.propTypes = {
  profile : PropTypes.object.isRequired,
  getAllProfiles : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile : state.profile
})

export default connect(mapStateToProps, {getAllProfiles})(Profiles)
