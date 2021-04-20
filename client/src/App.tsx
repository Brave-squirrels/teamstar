import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LandingPage from "containers/landingPage/landingPage";
import Main from "hoc/main/main";
import NavBar from "hoc/navbar/navbar";
import ProtectedRoute from "containers/protectedRoute/protectedRoute";

import { authUser, logout } from "reduxState/user/loginUser";
import SampleForm from "containers/forms/Sampleform";
import { RootState } from "reduxState/store";

const Hello = () => {
  return <span>YO YO YO</span>;
};

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginState = useSelector((state: RootState) => state.loginUser);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(authUser());
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("token") && history.location.pathname === "/")
      history.push("/home");
  }, [loginState.authenticated, history]);

  return (
    <>
      <Route exact path="/" component={LandingPage} />
      <Route
        path="/(.+)"
        render={() => (
          <>
            <NavBar />
            <Main>
              <Switch>
                <ProtectedRoute path="/home" component={Hello} />
                <ProtectedRoute
                  exact
                  path="/testInput"
                  component={SampleForm}
                />
                <Route render={() => <span>Not found</span>} />
              </Switch>
            </Main>
          </>
        )}
      />
    </>
  );
};

export default App;
