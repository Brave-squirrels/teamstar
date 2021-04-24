import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import socketIOClient from "socket.io-client";

import MainParticles from "components/mainParticles/mainParticles";

import LandingPage from "containers/landingPage/landingPage";
import Main from "hoc/main/main";
import NavBar from "hoc/navbar/navbar";
import ProtectedRoute from "containers/protectedRoute/protectedRoute";
import SendResetPassword from "containers/sendResetPassword/sendResetPassword";
import ResetPassword from "containers/resetPassword/resetPassword";
import Confirmed from "containers/confirmed/confirmed";
import Settings from "containers/user/settings/settings";
import NotFound from "containers/notFound/notFound";
import ConfirmedEmailChange from "containers/confirmedEmailChange/confirmedEmailChange";
import Dashboard from "containers/dashboard/Dashboard";
import Team from "containers/team/team";
import Tasks from "containers/tasks/tasks";
import Calendar from "containers/calendar/calendar";
import Chat from "containers/chat/chat";
import Break from "components/break/break";
import LateHour from "components/lateHour/lateHour";

import { authUser, logout } from "reduxState/user/loginUser";
import { RootState } from "reduxState/store";

const ENDPOINT = "http://localhost:5000";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginState = useSelector((state: RootState) => state.loginUser);
  const [response, setResponse] = useState("");
  const token: string = localStorage.getItem("token") || "null";
  const [currentBreak, setCurrentBreak] = useState("");

  const checkBreak = () => {
    if (loginState.userData!.breakTime) {
      const hourStart = parseInt(
        loginState.userData!.breakTime["b1"].start[0] +
          loginState.userData!.breakTime["b1"].start[1]
      );
      const minuteStart = parseInt(
        loginState.userData!.breakTime["b1"].start[3] +
          loginState.userData!.breakTime["b1"].start[4]
      );

      const hourEnd = parseInt(
        loginState.userData!.breakTime["b1"].end[0] +
          loginState.userData!.breakTime["b1"].end[1]
      );
      const minuteEnd = parseInt(
        loginState.userData!.breakTime["b1"].end[3] +
          loginState.userData!.breakTime["b1"].end[4]
      );

      const hourStart2 = parseInt(
        loginState.userData!.breakTime["b2"].start[0] +
          loginState.userData!.breakTime["b2"].start[1]
      );
      const minuteStart2 = parseInt(
        loginState.userData!.breakTime["b2"].start[3] +
          loginState.userData!.breakTime["b2"].start[4]
      );

      const hourEnd2 = parseInt(
        loginState.userData!.breakTime["b2"].end[0] +
          loginState.userData!.breakTime["b2"].end[1]
      );
      const minuteEnd2 = parseInt(
        loginState.userData!.breakTime["b2"].end[3] +
          loginState.userData!.breakTime["b2"].end[4]
      );

      const start2 = hourStart2 * 60 + minuteStart2;
      const end2 = hourEnd2 * 60 + minuteEnd2;

      const start = hourStart * 60 + minuteStart;
      const end = hourEnd * 60 + minuteEnd;
      const now = new Date();
      const time = now.getHours() * 60 + now.getMinutes();
      if (time > end) {
        setCurrentBreak(loginState.userData!.breakTime["b2"].end);
        return time >= start2 && time <= end2;
      } else {
        setCurrentBreak(loginState.userData!.breakTime["b1"].end);
        return time >= start && time <= end;
      }
    }
    return false;
  };

  const checkTime = () => {
    if (loginState.userData!.times) {
      const maxHours = parseInt(
        loginState.userData?.times.endTime[0] +
          loginState.userData?.times.endTime[1]
      );
      const maxMins = parseInt(
        loginState.userData?.times.endTime[3] +
          loginState.userData?.times.endTime[4]
      );

      const minHours = parseInt(
        loginState.userData?.times.startTime[0] +
          loginState.userData?.times.startTime[1]
      );
      const minMins = parseInt(
        loginState.userData?.times.startTime[3] +
          loginState.userData?.times.startTime[4]
      );
      const min = minHours * 60 + minMins;
      const max = maxHours * 60 + maxMins;

      const now = new Date();
      const time = now.getHours() * 60 + now.getMinutes();
      return time >= max || time <= min;
    }
  };

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, {
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
        token: token,
      },
    });
    socket.on("connected", (data) => {
      setResponse(data);
      console.log(data);
      console.log(response);
    });
  });

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
      <Route exact path="/emailChanged" component={ConfirmedEmailChange} />
      <Route exact path="/not-found" component={NotFound} />
      <Route
        path="/(.+)"
        render={() => (
          <Main>
            <NavBar />
            <MainParticles />
            {checkBreak() && <Break break={currentBreak} />}
            {checkTime() && (
              <LateHour time={loginState.userData?.times.startTime} />
            )}
            <Switch>
              <ProtectedRoute path="/home" component={Dashboard} />
              <ProtectedRoute path="/settings" component={Settings} />
              <ProtectedRoute path="/team/:teamId/chat" component={Chat} />
              <ProtectedRoute
                path="/team/:teamId/calendar"
                component={Calendar}
              />
              <ProtectedRoute path="/team/:teamId/tasks" component={Tasks} />
              <ProtectedRoute path="/team/:teamId" component={Team} />
              <ProtectedRoute path="/calendar" component={Calendar} />
              <Route render={() => <Redirect to="/not-found" />} />
            </Switch>
          </Main>
        )}
      />
    </Switch>
  );
};

export default App;
