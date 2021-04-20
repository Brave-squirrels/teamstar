import { useField } from "formik";
import React from "react";
import {
  Form,
  FormLabel,
  InputGroup,
  Overlay,
  OverlayTrigger,
  Popover,
  Tooltip,
} from "react-bootstrap";

interface Props {
  placeholder: string;
  name: string;
  rows: number;
  label?: string;
  type?: string;
}

const MyTextArea = (props: Props) => {
  const [field, meta] = useField(props.name);

  // return (
  //   <Form.Text>
  //     {meta.touched && meta.error ? (
  //       <OverlayTrigger
  //         placement="top"
  //         overlay={
  //           <Tooltip id="tooltip-input" style={{ color: "red!important" }}>
  //             {meta.error}
  //           </Tooltip>
  //         }
  //       >
  //         <input {...field} {...props} />
  //       </OverlayTrigger>
  //     ) : (
  //       <input {...field} {...props} />
  //     )}
  //   </Form.Text>
  // );

  return (
    <Form.Text>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <FormLabel style={{ color: "#e80000" }}>{meta.error}</FormLabel>
      ) : null}
    </Form.Text>
  );
};

export default MyTextArea;
