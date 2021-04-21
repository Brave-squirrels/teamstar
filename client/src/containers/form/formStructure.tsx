import React from "react";

import Input from "components/formElements/input/input";
import { Button, Modal } from "react-bootstrap";
import styles from "./formStructure.module.scss";
import onChangeForm from "utils/onChangeForm";

interface Props {
  state: any;
  title: string;
  setState: any;
  btnText: string;
  submitted: any;
  children?: JSX.Element;
  checkPass: boolean;
}

const formStructure = (props: Props) => {
  let key: typeof props.state;
  let elements = [];
  for (key in props.state) {
    elements.push({
      id: key,
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
        label={input.config.label}
        validity={input.config.valid}
        touched={input.config.touched}
        stateMain={props.state}
        error={input.config.error}
      />
    );
  });

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <form
        onSubmit={(event) => props.submitted(event)}
        className={styles.form}
      >
        {formElements} {props.children}{" "}
        <Button disabled={!props.state.formValid} type="submit">
          {props.btnText}
        </Button>
      </form>
    </Modal.Dialog>
  );
};

export default formStructure;
