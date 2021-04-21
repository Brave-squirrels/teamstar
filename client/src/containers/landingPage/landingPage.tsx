import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import FormStructure from "containers/form/formStructure";
import { mutateToAxios } from "utils/onChangeForm";

import { loginUserFetch } from "reduxState/user/loginUser";
import { createUserFetch } from "reduxState/user/registerUser";
import { RootState } from "reduxState/store";

import signInTmp from "../../assets/signInTmp.svg";
import signUpTmp from "../../assets/signUpTmp.svg";

import styles from "./landingPage.module.scss";

const LandingPage = () => {
  const dispatch = useDispatch();

  /* Handle animation */
  const [view, changeView] = useState(true);

  let classes = view
    ? [styles.container]
    : [styles.container, styles.signUpMode];

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

  const loginState = useSelector((state: RootState) => state.loginUser);
  const registerState = useSelector((state: RootState) => state.createUser);

  const handleSignIn = (e: any) => {
    e.preventDefault();
    dispatch(loginUserFetch(mutateToAxios(signInForm)));
  };

  const handleSignUp = (e: any) => {
    e.preventDefault();
    dispatch(createUserFetch(mutateToAxios(signUp)));
  };

  return (
    <div className={classes.join(" ")}>
      <div className={styles.formContainer}>
        <div className={styles.signInSignUp}>
          <div className={styles.signUpForm}>
            <FormStructure
              title="Sign up"
              state={signUp}
              setState={setSignUp}
              btnText="SIGN UP"
              submitted={handleSignUp}
              checkPass={true}
              spinner={registerState.loading}
            />
          </div>

          <div className={styles.signInForm}>
            <FormStructure
              title="Sign in"
              state={signInForm}
              setState={setSignInForm}
              btnText="SIGN IN"
              submitted={handleSignIn}
              checkPass={false}
              spinner={loginState.loading}
            />
          </div>
        </div>
      </div>

      <div className={styles.panelsContainer}>
        <div className={styles.panelLeft}>
          <div className={styles.content}>
            <span className={styles.goNext}>Don't have an account?</span>
            <Button onClick={() => changeView(false)}>Sign Up</Button>
          </div>

          <img src={signUpTmp} alt="SignUp" className={styles.image} />
        </div>
        <div className={styles.panelRight} id={styles.rightId}>
          <div className={styles.content}>
            <span className={styles.goNext}>One of us?</span>
            <Button onClick={() => changeView(true)} disabled={view}>
              Sign In
            </Button>
          </div>
          <img src={signInTmp} alt="SignIn" className={styles.image} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
