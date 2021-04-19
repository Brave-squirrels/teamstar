import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { RootState } from "../../reduxState/store";

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const isAuth = useSelector(
    (state: RootState) => state.loginUser.authenticated
  );

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
