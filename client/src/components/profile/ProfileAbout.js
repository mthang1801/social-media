import React from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({profile :{ bio, description, skills } }) => {
  return (
    <div className="profile-about bg-light p-2">
      <h2 className="text-primary">{bio}</h2>
      <p>
        {description}
      </p>
      <div className="line"></div>
      <h2 className="text-primary">Skills Set</h2>
      <div className="skills">
        {skills && skills.length && skills.map((skill,index) => (
          <div key={index} className="p-1"><i className="fa fa-check"></i> {skill}</div>
        ))}       
      </div>
    </div>
  )
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileAbout;
