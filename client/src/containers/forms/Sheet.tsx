import React, { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { Container, Form, Button, Col } from "react-bootstrap";

interface Values {
  email: string;
  name: string;
  surname: string;
  terms: boolean;
  size: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Required"),
  name: yup
    .string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  surname: yup
    .string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  terms: yup.bool().required().oneOf([true], "terms must be accepted"),
  size: yup
    .string()
    .required("Required")
    .oneOf(["1", "2", "3", "4", "5"], "size must selected"),
});

const Sheet = () => {
  const [data, setdata] = useState<Values>({
    email: "",
    name: "",
    surname: "",
    terms: false,
    size: "",
  });

  return (
    <Container className="mt-5">
      <Formik
        validationSchema={schema}
        initialValues={{
          email: "",
          name: "",
          surname: "",
          terms: false,
          size: "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          console.log(values);
          setdata(values);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="formBasicName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="formBasicName">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  value={values.surname}
                  onChange={handleChange}
                  isInvalid={touched.surname && !!errors.surname}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.surname}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && !!errors.email}
                isValid={touched.email && !errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Check
                name="terms"
                label="Agree to terms and conditions"
                onChange={handleChange}
                isInvalid={!!errors.terms}
                feedback={errors.terms}
                id="validationFormik106"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Select size</Form.Label>
              <Form.Control
                required
                as="select"
                name="size"
                value={values.size}
                onChange={handleChange}
                isInvalid={touched.size && !!errors.size}
              >
                <option hidden>Choose...</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.size}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>

      <p className="mt-5">{data.name}</p>
      <p>{data.surname}</p>
      <p>{data.email}</p>
      <p>{data.size}</p>
      <p>{data.terms}</p>
    </Container>
  );
};

export default Sheet;
