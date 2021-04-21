import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LandingPage from "containers/landingPage/landingPage";
import Main from "hoc/main/main";
import NavBar from "hoc/navbar/navbar";
import ProtectedRoute from "containers/protectedRoute/protectedRoute";

import { authUser, logout } from "reduxState/user/loginUser";
import { RootState } from "reduxState/store";
import Dnd from "containers/dnd/Dnd";

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
                <Route exact path="/dnd" component={Dnd} />
                <ProtectedRoute path="/home" component={Hello} />
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
