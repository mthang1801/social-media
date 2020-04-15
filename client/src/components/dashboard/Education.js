import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Moment from "react-moment";
import {deleteEducation} from "../../flux/actions/profile";
const Education = ({education, deleteEducation}) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td className='hide-sm'>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {!edu.to ? ("Now") : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => deleteEducation(edu._id)}><i className="fas fa-trash"></i></button>
      </td>
    </tr>
  ));
  return (
    <>
      <h2 className="my-2">Education</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  )
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation : PropTypes.func.isRequired
}

export default connect(null, {deleteEducation})(Education);
