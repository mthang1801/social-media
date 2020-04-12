import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import PropTypes from "prop-types";
const Landing = ({auth : {isAuthenticated, loading}}) => {
  return (
    <>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Developer Connector</h1>
            <p className="lead">
              Create a developer profile/portfolio, share posts and get help from
              other developers
            </p>
            {!isAuthenticated ? (<>
              <div className="buttons">
                <a href="/register" className="btn btn-primary">Sign Up</a>
                <a href="/login" className="btn btn-light">Login</a>
              </div>
            </>) : null}
            
          </div>
        </div>
      </section> 
    </>
  )
};

const  mapStateToProps = state => ({
  auth : state.auth
})

Landing.propTypes = {
  auth : PropTypes.object.isRequired
}
export default connect(mapStateToProps)(Landing);
