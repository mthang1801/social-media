import React from 'react';
import PropTypes from 'prop-types';
import "./Spinner.css";
const Spinner = () => {
  return (
    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  )
}
export default Spinner;
