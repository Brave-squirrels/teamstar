import React, { useEffect } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MainParticles from "components/mainParticles/mainParticles";

import LandingPage from "containers/landingPage/landingPage";
import Main from "hoc/main/main";
import NavBar from "hoc/navbar/navbar";
import ProtectedRoute from "containers/protectedRoute/protectedRoute";
import SendResetPassword from "containers/sendResetPassword/sendResetPassword";
import ResetPassword from "containers/resetPassword/resetPassword";
import Dnd from "containers/dnd/Dnd";
import Confirmed from "containers/confirmed/confirmed";
import Settings from "containers/user/settings/settings";
import NotFound from "containers/notFound/notFound";

import { authUser, logout } from "reduxState/user/loginUser";
import { RootState } from "reduxState/store";
import Dashboard from "containers/dashboard/Dashboard";

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
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/sendResetPassword" component={SendResetPassword} />
      <Route exact path="/resetPassword/:token" component={ResetPassword} />
      <Route exact path="/confirmed" component={Confirmed} />
      <Route exact path="/not-found" component={NotFound} />
      <Route
        path="/(.+)"
        render={() => (
          <Main>
            <NavBar />
            <MainParticles />
            <Switch>
              <ProtectedRoute path="/dnd" component={Dnd} />
              <ProtectedRoute path="/home" component={Dashboard} />
              <ProtectedRoute path="/settings" component={Settings} />
              <Route render={() => <Redirect to="/not-found" />} />
            </Switch>
          </Main>
        )}
      />
    </Switch>
  );
};

export default App;
