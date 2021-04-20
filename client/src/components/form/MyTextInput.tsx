import { useField } from "formik";
import React from "react";
import { Form, FormLabel } from "react-bootstrap";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
}

const MyTextInput = (props: Props) => {
  const [field, meta] = useField(props.name);

  return (
    <Form.Text>
      <label>{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <FormLabel style={{ position: "absolute" }} color="red">
          {meta.error}
        </FormLabel>
      ) : null}
    </Form.Text>
  );
};

export default MyTextInput;
