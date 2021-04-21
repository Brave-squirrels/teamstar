import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormStructure from "containers/form/formStructure";

import { sendResetFetch } from "reduxState/user/sendResetPassword";
import { mutateToAxios } from "utils/onChangeForm";
import { RootState } from "reduxState/store";

const SendResetPassword = () => {
  const dispatch = useDispatch();
  const reduxState = useSelector((state: RootState) => state.sendReset);
  const [form, setForm] = useState({
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
    formValid: false,
  });

  const sendMail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sendResetFetch(mutateToAxios(form)));
  };

  return (
    <div>
      <FormStructure
        title="Send reset password mail"
        state={form}
        setState={setForm}
        btnText="SEND"
        submitted={sendMail}
        spinner={reduxState.loading}
      />
    </div>
  );
};

export default SendResetPassword;
