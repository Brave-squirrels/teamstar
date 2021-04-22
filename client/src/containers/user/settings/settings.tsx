import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import FormStructure from "containers/form/formStructure";

import { changeNameFetch } from "reduxState/user/changeName";
import { changePasswordFetch } from "reduxState/user/changePassword";
import { RootState } from "reduxState/store";
import { mutateToAxios } from "utils/onChangeForm";

const Settings = () => {
  const dispatch = useDispatch();
  const changeName = useSelector((state: RootState) => state.changeName);
  const userInfo = useSelector((state: RootState) => state.loginUser);
  const changePassword = useSelector(
    (state: RootState) => state.changePassword
  );

  useEffect(() => {
    if (userInfo.userData.name) {
      setChangeNameForm((prevState) => {
        return {
          ...prevState,
          name: {
            ...prevState.name,
            val: userInfo.userData.name,
          },
        };
      });
    }
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
    <div>
      <FormStructure
        state={changeNameForm}
        setState={setChangeNameForm}
        btnText="Change"
        title="Change name"
        submitted={handleChangeName}
        spinner={changeName.loading}
      />
      <FormStructure
        state={changePasswordForm}
        setState={setChangePasswordForm}
        btnText="Change"
        title="Change password"
        submitted={handleChangePassword}
        spinner={changePassword.loading}
        checkPass={true}
      />
    </div>
  );
};

export default Settings;
