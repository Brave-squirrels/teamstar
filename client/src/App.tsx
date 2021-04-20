import React from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import ProtectedRoute from "./containers/protectedRoute/protectedRoute";

import { loginUserFetch } from "./reduxState/user/loginUser";
import MyTextInput from "./components/form/MyTextInput";

const Hello = () => {
  return <span>YO YO YO</span>;
};

const App = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Route exact path="/" render={() => <span>Home page</span>} />
      <Route
        path="/(.+)"
        render={() => (
          <>
            <ProtectedRoute exact path="/test" component={Hello} />
            <ProtectedRoute exact path="/testInput" component={MyTextInput} />
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
