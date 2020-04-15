import React from 'react'
import PropTypes from 'prop-types'
import Moment from "react-moment";
const ProfileExperience = ({profile :{ experience}}) => {
  return (
    <div class="profile-exp bg-white p-2">
      <h2 class="text-primary">Experience</h2>
      {experience && experience.length && experience.map(exp => (
        <div key={exp._id}>
          <h3 class="text-dark">{exp.company}</h3>
          <p><Moment format="YYYY/MM/DD" >{exp.from}</Moment> - {exp.current ? "Now" : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}</p>
          <p><strong>Position: </strong>{exp.title}</p>
          {exp.description.trim()!== "" && (
            <p>    
              <strong>Description: </strong>{exp.description}
            </p>
          )}
        
        </div>
      ))}  
    </div>
  )
}

ProfileExperience.propTypes = {
  profile : PropTypes.object.isRequired
}

export default ProfileExperience
