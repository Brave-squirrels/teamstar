import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import FormStructure from "containers/form/formStructure";

import { mutateToAxios } from "utils/onChangeForm";
import { resetPasswordFetch } from "reduxState/user/resetPassword";
import { RootState } from "reduxState/store";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const resetState = useSelector((state: RootState) => state.resetPassword);

  const [form, setForm] = useState({
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

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    dispatch(resetPasswordFetch(mutateToAxios(form), token));
  };

  return (
    <div>
      <FormStructure
        state={form}
        setState={setForm}
        btnText="RESET"
        title="Reset password"
        submitted={handleResetPassword}
        spinner={resetState.loading}
      />
    </div>
  );
};

export default ResetPassword;
