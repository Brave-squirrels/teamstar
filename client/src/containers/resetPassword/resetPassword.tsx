import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Button } from "react-bootstrap";
import FormStructure from "containers/form/formStructure";
import { Layout } from "hoc/layout/layout";

import { mutateToAxios } from "utils/onChangeForm";
import { resetPasswordFetch } from "reduxState/user/resetPassword";
import { RootState } from "reduxState/store";

import styles from "./resetPassword.module.scss";

const ResetPassword = () => {
  const dispatch = useDispatch();

  const { token }: any = useParams();

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
        maxLength: 26,
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
      },
      error: "Passwords should match",
      touched: false,
      valid: false,
    },
    formValid: false,
  });

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPasswordFetch(mutateToAxios(form), token));
  };

  return (
    <Layout>
      <div className={styles.btnWrapper}>
        <a href="/">
          <Button> Main page </Button>
        </a>
      </div>
      <div className={styles.innerWrapper}>
        <FormStructure
          state={form}
          setState={setForm}
          btnText="RESET"
          title="Reset password"
          submitted={handleResetPassword}
          spinner={resetState.loading}
          checkPass={true}
        />
      </div>
    </Layout>
  );
};

export default ResetPassword;
