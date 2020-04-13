import React from 'react';
import {Route, Redirect} from "react-router-dom"
import PropTypes from 'prop-types'
import {connect} from "react-redux";
const PrivateRoute = ({component : Component, auth : {isAuthenticated , isLoading }, children, ...rest }) => {
  //if component has existed
  if(Component){
    return (
      <Route
        {...rest}
        render={props => !isAuthenticated && !isLoading? (<Redirect to="/login" />) : (<Component {...props}/>) }
      />
    );
  }
  //if children has existed
  return  <Route
    {...rest}
    render={props => !isAuthenticated && !isLoading? (<Redirect to="/login" />) : (children) }
  />
}

PrivateRoute.propTypes = {
  auth : PropTypes.object.isRequired
}

const  mapStateToProps = state => ({
  auth : state.auth
})

export default connect(mapStateToProps)(PrivateRoute);
