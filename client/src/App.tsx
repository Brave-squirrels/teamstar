import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import LandingPage from "containers/landingPage/landingPage";
import Main from "hoc/main/main";
import NavBar from "hoc/navbar/navbar";
import Content from "hoc/content/content";
import ProtectedRoute from "containers/protectedRoute/protectedRoute";

import { loginUserFetch, authUser } from "reduxState/user/loginUser";

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
      <Route exact path="/" component={LandingPage} />
      <Route
        path="/(.+)"
        render={() => (
          <Main>
            <NavBar />
            <Content>
              <ProtectedRoute path="/test" component={Hello} />
            </Content>
          </Main>
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
