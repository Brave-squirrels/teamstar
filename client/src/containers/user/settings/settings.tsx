import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import FormStructure from "containers/form/formStructure";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";

import { changeNameFetch } from "reduxState/user/changeName";
import { changePasswordFetch } from "reduxState/user/changePassword";
import { RootState } from "reduxState/store";
import { mutateToAxios } from "utils/onChangeForm";

function MyVerticallyCenteredModal(props: any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        className="flex-column-reverse align-items-center"
      >
        <p>Type new user name and current password</p>

        <Modal.Title id="contained-modal-title-vcenter">
          Change your user name
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Label>USER NAME</Form.Label>
        <Form.Control type="text" placeholder="user_name"></Form.Control>
        <br />
        <Form.Label>CURRENT PASSWORD</Form.Label>
        <Form.Control type="text"></Form.Control>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cancel</Button>
        <Button onClick={props.onHide}>Done</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Settings = () => {
  const [modalShow, setModalShow] = React.useState(false);

  const dispatch = useDispatch();
  const changeName = useSelector((state: RootState) => state.changeName);
  const userInfo = useSelector((state: RootState) => state.loginUser);
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
    email: {
      val: "",
      type: "text",
      inputType: "input",
      placeholder: "Email",
      label: "Email",
      validation: {
        required: true,
        minLength: 4,
        maxLength: 50,
      },
      error: "",
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
        <Card bg="secondary" text="white">
          <Card.Body>
            <Card.Subtitle>USER NAME</Card.Subtitle>
            <Row md="2" className="mb-4">
              <Card.Text className="w-50%">user_name</Card.Text>
              <div className="text-right">
                <Button onClick={() => setModalShow(true)}>Edit</Button>
              </div>
            </Row>

            <Card.Subtitle>EMAIL ADDRESS</Card.Subtitle>
            <Row md="2" className="mb-4">
              <Card.Text className="w-50%">
                ****@mail.com<Card.Link href="#">show</Card.Link>
              </Card.Text>
              <div className="text-right">
                <Button>Edit</Button>
              </div>
            </Row>
          </Card.Body>
        </Card>
        <hr />
        <Button>Change password</Button>
        <hr />
        <Button variant="danger">Delete account</Button>
        {/* <FormStructure
              state={changeNameForm}
              setState={setChangeNameForm}
              btnText="Change"
              title="Change name"
              submitted={handleChangeName}
              spinner={changeName.loading}
              direction="row"
            /> */}

        {/* <FormStructure
              state={changePasswordForm}
              setState={setChangePasswordForm}
              btnText="Change"
              title="Change password"
              submitted={handleChangePassword}
              spinner={changePassword.loading}
              checkPass={true}
              direction="row"
            /> */}
      </Container>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default Settings;
