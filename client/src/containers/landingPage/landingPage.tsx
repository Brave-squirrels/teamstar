import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import FormStructure from "containers/form/formStructure";
import { mutateToAxios } from "utils/onChangeForm";

import { loginUserFetch } from "reduxState/user/loginUser";
import { createUserFetch } from "reduxState/user/registerUser";
import { RootState } from "reduxState/store";

const LandingPage = () => {
  const dispatch = useDispatch();

  const [signInForm, setSignInForm] = useState({
    email: {
      val: "",
      type: "email",
      inputType: "input",
      placeholder: "E-mail",
      label: "E-mail",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 50,
      },
      error: "Mail should be 5-50",
      touched: false,
      valid: false,
    },
    password: {
      val: "",
      type: "password",
      inputType: "input",
      placeholder: "********",
      label: "Password",
      validation: {
        required: true,
        minLength: 8,
        maxLength: 50,
      },
      error: "At least 8",
      touched: false,
      valid: false,
    },
    formValid: false,
  });
  const [signUp, setSignUp] = useState({
    name: {
      val: "",
      type: "text",
      inputType: "input",
      placeholder: "Name",
      label: "Name",
      validation: {
        required: true,
        minLength: 4,
        maxLength: 50,
      },
      error: "Name should be between 4 and 50",
      touched: false,
      valid: false,
    },
    email: {
      val: "",
      type: "email",
      inputType: "input",
      placeholder: "E-mail",
      label: "E-mail",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 50,
      },
      error: "Mail should be 5-50",
      touched: false,
      valid: false,
    },
    password: {
      val: "",
      type: "password",
      inputType: "input",
      placeholder: "********",
      label: "Password",
      validation: {
        required: true,
        minLength: 8,
        maxLength: 50,
      },
      error: "Pass at least 8",
      touched: false,
      valid: false,
    },
    confirmPassword: {
      val: "",
      type: "password",
      inputType: "input",
      placeholder: "********",
      label: "Confirm Password",
      validation: {
        required: true,
        minLength: 8,
        maxLength: 50,
      },
      error: "Pass should match",
      touched: false,
      valid: false,
    },
    formValid: false,
  });

  const [signIn, setSignIn] = useState({
    display: false,
    btnText: "Sign Up",
  });

  const loginState = useSelector((state: RootState) => state.loginUser);
  const registerState = useSelector((state: RootState) => state.createUser);

  const handleSignIn = () => {
    dispatch(loginUserFetch(mutateToAxios(signInForm)));
  };

  const handleSignUp = () => {
    dispatch(createUserFetch(mutateToAxios(signUp)));
  };

  return (
    <>
      <div>
        <Button
          onClick={() =>
            setSignIn((prevState) => {
              if (prevState.btnText === "Sign Up") {
                return {
                  display: true,
                  btnText: "Sign In",
                };
              } else {
                return {
                  display: false,
                  btnText: "Sign Up",
                };
              }
            })
          }
        >
          {signIn.btnText}
        </Button>
      </div>

      {signIn.display ? (
        <>
          {registerState.loading ? (
            <Spinner animation="border" role="status" />
          ) : (
            <FormStructure
              title="Sign up"
              state={signUp}
              setState={setSignUp}
              btnText="SIGN UP"
              submitted={handleSignUp}
              checkPass={false}
            />
          )}
        </>
      ) : (
        <>
          {loginState.loading ? (
            <Spinner animation="border" role="status" />
          ) : (
            <FormStructure
              title="Sign in"
              state={signInForm}
              setState={setSignInForm}
              btnText="SIGN IN"
              submitted={handleSignIn}
              checkPass={false}
            />
          )}
        </>
      )}
    </>
  );
};

export default LandingPage;
