import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import getAuthToken from "./ultis/getAuthToken";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      getAuthToken() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired
};

export default PrivateRoute;
