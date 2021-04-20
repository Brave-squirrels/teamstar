import { useField } from "formik";
import React, { useState } from "react";
import { Form, FormLabel } from "react-bootstrap";

interface Props {
  placeholder: string;
  name: string;
  options: any[];
  label?: string;
}

const MySelectInput = (props: Props) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <Form.Text>
      <Form.Control
        value={field.value}
        as="select"
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      >
        {props.options.map((option: any) => (
          <option value={`${option.value}`}>{option.text}</option>
        ))}
      </Form.Control>
      {meta.touched && meta.error ? (
        <FormLabel style={{ color: "#e80000" }}>{meta.error}</FormLabel>
      ) : null}
    </Form.Text>
  );
};

export default MySelectInput;
