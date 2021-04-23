import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import FormStructure from "containers/form/formStructure";
import { Button, Container, Jumbotron, Modal, Nav, Row } from "react-bootstrap";

import { changeNameFetch } from "reduxState/user/changeName";
import { changePasswordFetch } from "reduxState/user/changePassword";
import { RootState } from "reduxState/store";
import { mutateToAxios } from "utils/onChangeForm";

function MyVerticallyCenteredModal(props: any) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton className="text-center"></Modal.Header>

      <Modal.Body className="mb-4">{props.children}</Modal.Body>
    </Modal>
  );
}

const Settings = () => {
  const [modalNameShow, setModalNameShow] = React.useState(false);
  const [modalPasswordShow, setModalPasswordShow] = React.useState(false);

  const dispatch = useDispatch();
  const changeName = useSelector((state: RootState) => state.changeName);
  const userInfo = useSelector((state: RootState) => state.loginUser);

  const { name, email } = userInfo.userData!;
  const userEmail =
    email.split("@")[0].replace(/./g, "*") + "@" + email.split("@")[1];

  const changePassword = useSelector(
    (state: RootState) => state.changePassword
  );

  useEffect(() => {
    setChangeNameForm((prevState) => {
      return {
        ...prevState,
        name: {
          ...prevState.name,
          val: userInfo.userData!.name,
        },
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeName.success, userInfo.userData!.name, userInfo.userData]);

  const [changeNameForm, setChangeNameForm] = useState({
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
    formValid: false,
  });

  const [changePasswordForm, setChangePasswordForm] = useState({
    oldPassword: {
      val: "",
      type: "password",
      inputType: "input",
      placeholder: "********",
      label: "Old password",
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
    password: {
      val: "",
      type: "password",
      inputType: "input",
      placeholder: "********",
      label: "New password",
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

  const handleChangeName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(changeNameFetch(mutateToAxios(changeNameForm)));
  };
  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(changePasswordFetch(mutateToAxios(changePasswordForm)));
  };

  return (
    <>
      <Container className="mt-5">
        <h2 className="text-light">MY ACCOUNT</h2>
        <Row xs="1" md="2" className="mr-1 ml-1">
          <Jumbotron className="position-relative pt-4 pb-4">
            <h6>USER NAME</h6>
            <div className="d-flex justify-content-between align-items-center">
              <p className="m-0">{name}</p>
              <Button size="sm" onClick={() => setModalNameShow(true)}>
                Edit
              </Button>
            </div>

            <h6 className="mt-4">EMAIL ADDRESS</h6>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <p className="m-0">{userEmail}</p>{" "}
                <Nav.Link eventKey="link-2">Show</Nav.Link>
              </div>
              <Button size="sm" onClick={() => setModalPasswordShow(true)}>
                Edit
              </Button>
            </div>
          </Jumbotron>
        </Row>

        <Row xs="1" md="2" className="mr-1 ml-1 position-relative">
          <div>
            <hr className="mb-4 mt-4 ml-0 " />
            <Button onClick={() => setModalPasswordShow(true)}>
              Change password
            </Button>
            <hr className="mb-4 mt-5 ml-0" />
            <Button variant="danger">Delete account</Button>
          </div>
        </Row>
      </Container>

      <MyVerticallyCenteredModal
        show={modalNameShow}
        onHide={() => setModalNameShow(false)}
        user={userInfo}
      >
        <FormStructure
          state={changeNameForm}
          setState={setChangeNameForm}
          btnText="Change"
          title="Change your user name"
          submitted={handleChangeName}
          spinner={changeName.loading}
        />
      </MyVerticallyCenteredModal>

      <MyVerticallyCenteredModal
        show={modalPasswordShow}
        onHide={() => setModalPasswordShow(false)}
        user={userInfo}
      >
        <FormStructure
          state={changePasswordForm}
          setState={setChangePasswordForm}
          btnText="Change"
          title="Change password"
          submitted={handleChangePassword}
          spinner={changePassword.loading}
          checkPass={true}
        />
      </MyVerticallyCenteredModal>
    </>
  );
};

export default Settings;
