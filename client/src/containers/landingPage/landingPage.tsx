import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import FormStructure from "containers/form/formStructure";
import { mutateToAxios } from "utils/onChangeForm";

import Particles from "react-particles-js";

import { loginUserFetch } from "reduxState/user/loginUser";
import { createUserFetch } from "reduxState/user/registerUser";
import { sendAgainFetch } from "reduxState/user/sendAgain";
import { RootState } from "reduxState/store";

import signInTmp from "../../assets/sign.svg";
import signUpTmp from "../../assets/signUpTmp.svg";

import styles from "./landingPage.module.scss";

const LandingPage = () => {
  const dispatch = useDispatch();

  const loginState = useSelector((state: RootState) => state.loginUser);
  const registerState = useSelector((state: RootState) => state.createUser);
  const sendAgainState = useSelector((state: RootState) => state.sendAgain);

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
      error: "Mail should be between 5 and 50 characters long",
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
        maxLength: 26,
      },
      error: "Password should be at least 8 characters long",
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
      error: "Name should be between 4 and 50 characters long",
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
      error: "Mail should be between 5 and 50 characters long",
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
        maxLength: 26,
        passwordRule: true,
      },
      error:
        "Password should be at least 8 characters long, contain 1 uppercase letter, 1 lowercase, 1 number and 1 symbol",
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
        maxLength: 26,
        passwordRule: true,
      },
      error: "Passwords should match",
      touched: false,
      valid: false,
    },
    formValid: false,
  });

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUserFetch(mutateToAxios(signInForm)));
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createUserFetch(mutateToAxios(signUp)));
  };

  const handleSendAgain = () => {
    dispatch(sendAgainFetch({ email: signUp.email.val }));
  };

  return (
    <div className={classes.join(" ")}>
      <Particles className={styles.xd} />
      <div className={styles.formContainer}>
        <div className={styles.signInSignUp}>
          <div className={styles.signUpForm}>
            {registerState.success ? (
              <>
                {sendAgainState.loading ? (
                  <Spinner animation="border" />
                ) : (
                  <Button onClick={handleSendAgain}>Send again</Button>
                )}
              </>
            ) : (
              <>
                <FormStructure
                  title="Sign up"
                  state={signUp}
                  setState={setSignUp}
                  btnText="SIGN UP"
                  submitted={handleSignUp}
                  checkPass={true}
                  spinner={registerState.loading}
                />
              </>
            )}
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
            >
              <Link to="/sendresetpassword"> Forgot password? </Link>
            </FormStructure>
          </div>
        </div>
      </div>

      <div className={styles.panelsContainer}>
        <div className={styles.panelLeft}>
          <div className={styles.content}>
            <span className={styles.goNext}>Don't have an account?</span>
            <Button className="primary" onClick={() => changeView(false)}>
              Sign Up
            </Button>
          </div>

          <img src={signUpTmp} alt="SignUp" className={styles.image} />
        </div>
        <div className={styles.panelRight} id={styles.rightId}>
          <div className={styles.content}>
            <span className={styles.goNext}>One of us?</span>
            <Button
              className="primary"
              onClick={() => changeView(true)}
              disabled={view}
            >
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
