import { useField } from "formik";
import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
}

const MyTextInput = (props: Props) => {
  const [field, meta] = useField(props.name);

  return <Form.Text></Form.Text>;
};

export default MyTextInput;
