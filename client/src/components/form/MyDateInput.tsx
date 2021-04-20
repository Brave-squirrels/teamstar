import { useField } from "formik";
import React from "react";
import { Form, FormLabel } from "react-bootstrap";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

const MyDateInput = (props: Partial<ReactDatePickerProps>) => {
  const [field, meta, helpers] = useField(props.name!);

  return (
    <Form.Text>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value: any) => helpers.setValue(value)}
      />
      {meta.touched && meta.error ? (
        <FormLabel style={{ color: "#e80000" }}>{meta.error}</FormLabel>
      ) : null}
    </Form.Text>
  );
};

export default MyDateInput;
