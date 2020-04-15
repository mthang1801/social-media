import React, { Fragment } from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../flux/actions/auth";
const Navbar = ({auth : {isAuthenticated , isLoading }, logout}) => {

  const guestLinks = (
    <ul>
      <li><Link to="!#">Developers</Link></li>        
      <li><Link to="/profiles">Profiles</Link></li>        
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>              
    </ul> 
  )

  const authLinks = (
    <ul>
      <li><Link to="/profiles">Profiles</Link></li> 
      <li><Link to="/dashboard"><i className="fas fa-user" aria-hidden="true"></i>{" "}<span className="hide-sm">Dashboard</span></Link></li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul> 
  )

  return (
    <>
     <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      <ul>           
        {!isLoading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
      </ul>
    </nav> 
    </>
  )
};

const mapStateToProps = state => ({
  auth: state.auth
})

Navbar.propTypes = {
  auth : PropTypes.object.isRequired,
  logout : PropTypes.func.isRequired
}
export default connect(mapStateToProps, {logout})(Navbar);
