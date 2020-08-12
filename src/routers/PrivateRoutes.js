import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoutes = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    let lastPathVisited = rest.location.pathname;
    const queryString = rest.location.search;

    lastPathVisited = ( queryString.length > 3 ) ? lastPathVisited + queryString : lastPathVisited;

    localStorage.setItem( 'lastPath', lastPathVisited );
    
    return (
        <Route { ...rest }
            component={( props ) => (
                ( isAuthenticated ) 
                    ? <Component { ...props } />
                    : <Redirect to="/login" />
            )}
        />
    )
}

PrivateRoutes.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
