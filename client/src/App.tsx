import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import ProtectedRoute from "./containers/protectedRoute/protectedRoute";

import { loginUserFetch, authUser } from "./reduxState/user/loginUser";

const Hello = () => {
  return <span>YO YO YO</span>;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

  return (
    <>
      <Route exact path="/" render={() => <span>Home page</span>} />
      <Route
        path="/(.+)"
        render={() => (
          <>
            <ProtectedRoute path="/test" component={Hello} />
          </>
        )}
      />
      <button
        onClick={() =>
          dispatch(
            loginUserFetch({ email: "mail@mail.com", password: "password" })
          )
        }
      >
        LOGIN
      </button>
    </>
  );
};

export default App;
