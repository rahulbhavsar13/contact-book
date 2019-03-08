import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import DatabaseService from '../services/DatabaseService';
import * as AppConstants from '../utils/AppConstants';

/**
 * Sets up a private route to be used in post-login sessions.
 */
const PrivateRoute = ({ component: Component, store: store, ...rest } ) => (
    
    <Route {...rest} render={function (props) {
        const token = DatabaseService.getSessionToken();
        if (token && token != '') {
            return <Component {...props}/>
        } else {
            const redirectTo = {
                pathname: AppConstants.APP_ROUTE_LOGIN,
                state: { from: props.location }
            };
            return <Redirect to={ redirectTo } />    
        }
    }}/>
);
  
PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    location: PropTypes.object
}

export default PrivateRoute;