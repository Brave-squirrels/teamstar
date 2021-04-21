import React from "react";

import Input from "components/formElements/input/input";
import { Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";

import styles from "./formStructure.module.scss";

import onChangeForm from "utils/onChangeForm";

interface Props {
  state: any;
  title: string;
  setState: any;
  btnText: string;
  submitted: any;
  children?: JSX.Element;
  checkPass?: boolean;
  spinner?: boolean;
}

const formStructure = (props: Props) => {
  let key: typeof props.state;
  let elements = [];
  for (key in props.state) {
    elements.push({
      id: key,
      name: key,
      config: props.state[key],
    });
  }

  const onChangeInput = (
    event: { target: HTMLInputElement },
    inputType: typeof props.state
  ) => {
    /* Mutate, save and valid state */
    onChangeForm(
      event,
      inputType,
      props.state,
      props.setState,
      props.checkPass
    );
  };

  const formElements = elements.map((input: any) => {
    return (
      <Input
        key={input.id}
        type={input.config.type}
        inputType={input.config.inputType}
        placeholder={input.config.placeholder}
        inputValue={input.config.val}
        onChangeInput={(e: { target: HTMLInputElement }) =>
          onChangeInput(e, input.id)
        }
        inputName={input.name}
        label={input.config.label}
        validity={input.config.valid}
        touched={input.config.touched}
        stateMain={props.state}
        error={input.config.error}
      />
    );
  });

  return (
    <div className={styles.formWrapper}>
      <span className={styles.formTitle}>{props.title}</span>
      <form
        onSubmit={(event) => props.submitted(event)}
        className={styles.form}
      >
        {formElements} {props.children}
        {props.spinner ? (
          <Spinner animation="border" />
        ) : (
          <Button disabled={!props.state.formValid} type="submit">
            {props.btnText}
          </Button>
        )}
      </form>
    </div>
  );
};

export default formStructure;
