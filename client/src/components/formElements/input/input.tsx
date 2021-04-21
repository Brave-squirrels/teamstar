import React, { FunctionComponent } from "react";
import styles from "./input.module.scss";

interface Props {
  type: string;
  placeholder: string;
  inputValue: string;
  onChangeInput: any;
  label: string;
  validity: boolean;
  touched: boolean;
  inputType: string;
  stateMain?: any;
  name?: string;
  error?: string;
  inputName: string;
}

const input: FunctionComponent<Props> = (props) => {
  let inputClasses: string[] = [styles.inputContainer];
  if (!props.validity && props.touched) {
    inputClasses = [styles.inputContainer, styles.invalidInput];
  }

  let selectOptions = [];
  if (props.inputType === "select") {
    for (let key in props.stateMain[props.inputName].options) {
      selectOptions.push(props.stateMain[props.inputName].options[key]);
    }
  }

  let input;
  switch (props.inputType) {
    case "input":
      input = (
        <div className={styles.container}>
          <span className={styles.label}>{props.label}</span>
          <label className={inputClasses.join(" ")}>
            <input
              className={styles.input}
              type={props.type}
              placeholder={props.placeholder}
              value={props.inputValue}
              onChange={props.onChangeInput}
            />
          </label>
        </div>
      );
      break;
    case "textarea":
      input = (
        <div className={styles.container}>
          <span className={styles.label}>{props.label}</span>
          <label className={inputClasses.join(" ")}>
            <textarea
              className={[styles.input, styles.textarea].join(" ")}
              placeholder={props.placeholder}
              value={props.inputValue}
              onChange={props.onChangeInput}
            />
          </label>
        </div>
      );
      break;
    case "select":
      input = (
        <div className={styles.container}>
          <span className={styles.label}>{props.label}</span>
          <label className={inputClasses.join(" ")}>
            <select
              name={props.name}
              value={props.inputValue}
              onChange={props.onChangeInput}
              className={styles.select}
            >
              {selectOptions.map((option) => {
                return (
                  <option value={option.val} key={option.val}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
      );
      break;
  }

  return (
    <>
      {input}{" "}
      {!props.validity && props.touched && props.error && (
        <span className={styles.error}>{props.error}</span>
      )}
    </>
  );
};

export default input;
