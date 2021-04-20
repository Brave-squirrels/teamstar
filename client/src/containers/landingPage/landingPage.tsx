import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Modal } from "react-bootstrap";
import MyTextInput from "components/form/MyTextInput";

import { loginUserFetch } from "reduxState/user/loginUser";
interface LoginData {
  email: string;
  password: string;
}

const LandingPage = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string().required("Email pls"),
    password: Yup.string().required("Password pls"),
  });

  const sampleValues: LoginData = {
    email: "",
    password: "",
  };

  const handleFormSubmit = (data: any) => {
    dispatch(loginUserFetch(data));
  };

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={sampleValues}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form
            className={"form-group"}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <Modal.Body>
              <MyTextInput name="email" placeholder="E-mail" type="email" />
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
    </Modal.Dialog>
  );
};

export default LandingPage;
