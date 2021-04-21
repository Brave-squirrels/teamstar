import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Modal } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import MyTextInput from "components/form/MyTextInput";

import { loginUserFetch } from "reduxState/user/loginUser";
import { createUserFetch } from "reduxState/user/registerUser";
import { RootState } from "reduxState/store";
interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

const signUpValues: LoginData = {
  email: "",
  password: "",
};

const signInValues: RegisterData = {
  email: "",
  password: "",
  name: "",
  confirmPassword: "",
};

const LandingPage = () => {
  const dispatch = useDispatch();

  const [signIn, setSignIn] = useState({
    display: false,
    btnText: "Sign Up",
  });

  const loginState = useSelector((state: RootState) => state.loginUser);
  const registerState = useSelector((state: RootState) => state.createUser);

  const validationSignUp = Yup.object({
    email: Yup.string().required("Email pls"),
    password: Yup.string().required("Password pls"),
  });

  const validationSignIn = Yup.object({
    email: Yup.string().required("Email pls"),
    name: Yup.string().required("Name pls"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const handleSignUp = (data: any) => {
    dispatch(loginUserFetch(data));
  };

  const handleSignIn = (data: any) => {
    dispatch(createUserFetch(data));
  };

  return (
    <>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>
            {signIn.btnText === "Sign In" ? "Sign Up" : "Sign In"}
          </Modal.Title>
        </Modal.Header>
        {signIn.display ? (
          <>
            {registerState.loading ? (
              <Spinner animation="border" role="status" />
            ) : (
              <Formik
                validationSchema={validationSignIn}
                enableReinitialize
                initialValues={signInValues}
                onSubmit={(values) => handleSignIn(values)}
              >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                  <Form
                    className={"form-group"}
                    onSubmit={handleSubmit}
                    autoComplete="off"
                  >
                    <Modal.Body>
                      <MyTextInput name="name" placeholder="Name" type="text" />
                      <MyTextInput
                        name="email"
                        placeholder="E-mail"
                        type="email"
                      />
                      <MyTextInput
                        name="password"
                        placeholder="********"
                        type="password"
                      />
                      <MyTextInput
                        name="confirmPassword"
                        placeholder="********"
                        type="password"
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        disabled={isSubmitting || !dirty || !isValid}
                        type="submit"
                        variant="success"
                        className="pull-right"
                      >
                        Submit
                      </Button>
                    </Modal.Footer>
                  </Form>
                )}
              </Formik>
            )}
          </>
        ) : (
          <>
            {loginState.loading ? (
              <Spinner animation="border" role="status" />
            ) : (
              <Formik
                validationSchema={validationSignUp}
                enableReinitialize
                initialValues={signUpValues}
                onSubmit={(values) => handleSignUp(values)}
              >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                  <Form
                    className={"form-group"}
                    onSubmit={handleSubmit}
                    autoComplete="off"
                  >
                    <Modal.Body>
                      <MyTextInput
                        name="email"
                        placeholder="E-mail"
                        type="email"
                      />
                      <MyTextInput
                        name="password"
                        placeholder="********"
                        type="password"
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        disabled={isSubmitting || !dirty || !isValid}
                        type="submit"
                        variant="success"
                        className="pull-right"
                      >
                        Submit
                      </Button>
                    </Modal.Footer>
                  </Form>
                )}
              </Formik>
            )}{" "}
          </>
        )}
      </Modal.Dialog>
      <div className="container text-center">
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
    </>
  );
};

export default LandingPage;
