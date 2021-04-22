import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "react-bootstrap";
import FormStructure from "containers/form/formStructure";
import { Layout } from "hoc/layout/layout";

import { sendResetFetch } from "reduxState/user/sendResetPassword";
import { mutateToAxios } from "utils/onChangeForm";
import { RootState } from "reduxState/store";

import styles from "./sendResetPassword.module.scss";

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
    <Layout>
      <div className={styles.btnWrapper}>
        <a href="/">
          <Button> Go back </Button>
        </a>
      </div>
      <div className={styles.innerWrapper}>
        <FormStructure
          title="Reset password"
          state={form}
          setState={setForm}
          btnText="SEND"
          submitted={sendMail}
          spinner={reduxState.loading}
        />
      </div>
    </Layout>
  );
};

export default SendResetPassword;
