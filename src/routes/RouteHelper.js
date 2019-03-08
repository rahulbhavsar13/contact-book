import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import AsyncComponent from '../async';

/**
 * Helper for route management.
 */
const RouteHelper = {

    /**
     * Builds routes using requested params.
     * Also adds a default {@link Redirect} route if configured so, trusts 
     * props.location for path to parent redirecting path.
     * @param {Array} routes 
     * @param {Object} props 
     */
    buildRoutes(routes, props) {
        const defaultRoute = routes.find((route) => {
            return route.default == true;
        });
        return (
            <Switch>
                {routes.map((route, i) => (
                    <Route
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        render={() => (
                            <AsyncComponent {...props} routes={route.routes}
                                moduleProvider={route.main} state={route.state}/>
                        )} />
                ))}
                { defaultRoute && props.location ? <Redirect from={props.location.pathname} exact to={defaultRoute.path} /> : ""}
            </Switch>
        )
    }
};

RouteHelper.buildRoutes.propTypes = {
    location: PropTypes.object,
    pathname: PropTypes.string
}

export default RouteHelper;