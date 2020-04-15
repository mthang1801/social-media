import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
const ProfileEducation = ({ profile: { education } }) => {
  return (
    <div className='profile-edu bg-white p-2'>
      <h2 className='text-primary'>Education</h2>
      {education &&
        education.length &&
        education.map((edu) => (
          <div key={edu._id}>
            <h3>{edu.school}</h3>
            <p>
              <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{" "}
              {edu.current ? (
                "Now"
              ) : (
                <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
              )}
            </p>
            <p>
              <strong>Degree: </strong>
              {edu.degree}
            </p>
            {edu.fieldtostudy && (
              <p>
                <strong>Field Of Study: </strong>
                {edu.fieldtostudy}
              </p>
            )}
          </div>
        ))}
    </div>
  );
};

ProfileEducation.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileEducation;
