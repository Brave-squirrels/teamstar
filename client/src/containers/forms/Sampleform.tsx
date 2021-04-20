import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Card, InputGroup, Modal } from "react-bootstrap";
import MyTextInput from "components/form/MyTextInput";

interface SampleObject {
  sampleTitle: string;
  sampleDescription: string;
  sampleDate: string;
}

const SampleForm = () => {
  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    date: Yup.string().required("Date is required").nullable(),
  });

  const [sampleValues, setSampleValues] = useState<SampleObject>({
    sampleTitle: "",
    sampleDescription: "",
    sampleDate: "",
  });

  const handleFormSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Sample Form</Modal.Title>
      </Modal.Header>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={sampleValues}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form
            className={"form-group"}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <Modal.Body>
              <MyTextInput name="title" placeholder="title" />
              <MyTextInput name="description" placeholder="description" />
              <MyTextInput name="date" placeholder="date" />
            </Modal.Body>
            <Modal.Footer>
              <Button
                disabled={isSubmitting || !dirty || !isValid}
                type="submit"
                variant="success"
                className="pull-right"
              >
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal.Dialog>
  );
};

export default SampleForm;
