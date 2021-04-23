import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import FormStructure from "containers/form/formStructure";
import {
  Button,
  Container,
  Jumbotron,
  Nav,
  Row,
  Spinner,
} from "react-bootstrap";

import { changeNameFetch } from "reduxState/user/changeName";
import { changeEmailFetch } from "reduxState/user/changeEmail";
import { changePasswordFetch } from "reduxState/user/changePassword";
import { deleteUserFetch } from "reduxState/user/deleteUser";
import { RootState } from "reduxState/store";
import { mutateToAxios } from "utils/onChangeForm";

import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";

type ShowType = "Show" | "Hide";

const Settings = () => {
  const [modalNameShow, setModalNameShow] = useState(false);
  const [modalEmailShow, setModalEmailShow] = useState(false);
  const [modalPasswordShow, setModalPasswordShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [name, setName] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [hiddenEmail, setHiddenEmail] = useState("");
  const [showToggle, setShowToggle] = useState<ShowType>("Show");

  const dispatch = useDispatch();
  const changeName = useSelector((state: RootState) => state.changeName);
  const changeEmail = useSelector((state: RootState) => state.changeEmail);
  const userInfo = useSelector((state: RootState) => state.loginUser);
  const deleteState = useSelector((state: RootState) => state.deleteUser);
  let { email } = userInfo.userData!;

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
    setHiddenEmail(
      userInfo.userData!.email.split("@")[0].replace(/./g, "*") +
        "@" +
        email.split("@")[1]
    );
    setUserEmail(
      userInfo.userData!.email.split("@")[0].replace(/./g, "*") +
        "@" +
        email.split("@")[1]
    );
    setName(userInfo.userData!.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.userData!.email, userInfo.userData]);

  useEffect(() => {
    setName(changeNameForm.name.val);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeName.success]);

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

  const [changeEmailForm, setChangeEmailForm] = useState({
    email: {
      val: "",
      type: "text",
      inputType: "input",
      placeholder: "New email",
      label: "New email",
      validation: {
        required: true,
        minLength: 4,
        maxLength: 50,
      },
      error: "Email should be between 4 and 50 characters long",
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

  const handleChangeEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      changeEmailFetch({
        email: userInfo.userData!.email,
        newEmail: changeEmailForm.email.val,
      })
    );
  };

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(changePasswordFetch(mutateToAxios(changePasswordForm)));
  };

  const handleToggleShow = () => {
    if (showToggle === "Show") {
      setUserEmail(email);
      setShowToggle("Hide");
    } else {
      setUserEmail(hiddenEmail);
      setShowToggle("Show");
    }
  };

  const handleDeleteCancelBtn = () => {
    setModalDeleteShow(false);
  };

  const handleDeleteAccount = () => {
    dispatch(deleteUserFetch());
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
                <Nav.Link onClick={handleToggleShow}>{showToggle}</Nav.Link>
              </div>
              <Button size="sm" onClick={() => setModalEmailShow(true)}>
                Edit
              </Button>
            </div>
            <span className="text-info small">
              Check your inbox and follow the instructions to finish chagne your
              email address
            </span>
          </Jumbotron>
        </Row>

        <Row xs="1" md="2" className="mr-1 ml-1 position-relative">
          <div>
            <hr className="mb-4 mt-4 ml-0 " />
            <Button onClick={() => setModalPasswordShow(true)}>
              Change password
            </Button>
            <hr className="mb-4 mt-5 ml-0" />
            <Button
              variant="outline-danger"
              onClick={() => setModalDeleteShow(true)}
            >
              Delete account
            </Button>
          </div>
        </Row>
      </Container>

      <MyVerticallyCenteredModal
        show={modalNameShow}
        onHide={() => setModalNameShow(false)}
        user={userInfo}
        title="Change your user name"
      >
        <FormStructure
          state={changeNameForm}
          setState={setChangeNameForm}
          btnText="Change"
          title=""
          submitted={handleChangeName}
          spinner={changeName.loading}
        />
      </MyVerticallyCenteredModal>

      <MyVerticallyCenteredModal
        show={modalEmailShow}
        onHide={() => setModalEmailShow(false)}
        user={userInfo}
        title="Change your email address"
      >
        {changeEmail.success ? (
          <span>Check email bro</span>
        ) : (
          <FormStructure
            state={changeEmailForm}
            setState={setChangeEmailForm}
            btnText="Change"
            title=""
            submitted={handleChangeEmail}
            spinner={changeEmail.loading}
          />
        )}
      </MyVerticallyCenteredModal>

      <MyVerticallyCenteredModal
        show={modalPasswordShow}
        onHide={() => setModalPasswordShow(false)}
        user={userInfo}
        title="Change password"
      >
        <FormStructure
          state={changePasswordForm}
          setState={setChangePasswordForm}
          btnText="Change"
          title=""
          submitted={handleChangePassword}
          spinner={changePassword.loading}
          checkPass={true}
        />
      </MyVerticallyCenteredModal>

      <MyVerticallyCenteredModal
        show={modalDeleteShow}
        onHide={() => setModalDeleteShow(false)}
        user={userInfo}
        title="Arey you sure?"
      >
        <div className="d-flex justify-content-around">
          <Button variant="primary" onClick={handleDeleteCancelBtn}>
            Cancel
          </Button>
          {deleteState.loading ? (
            <Spinner animation="border" style={{ color: "#02ADDB" }} />
          ) : (
            <Button variant="danger" onClick={handleDeleteAccount}>
              Delete
            </Button>
          )}
        </div>
      </MyVerticallyCenteredModal>
    </>
  );
};

export default Settings;
