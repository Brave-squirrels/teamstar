import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Modal } from "react-bootstrap";
import MyTextInput from "components/form/MyTextInput";
import MyTextArea from "components/form/MyTextArea";
import MyDateInput from "components/form/MyDateInput";
import { useState } from "react";
import MySelectInput from "components/form/MySelectInputs";
import { categoryOptions } from "./sampleSelectValues";

interface SampleObject {
  title: string;
  description: string;
  date: string;
  category: string;
}

const SampleForm = () => {
  const validationSchema = Yup.object({
    title: Yup.string().min(3).required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    date: Yup.string().required("Date is required").nullable(),
    category: Yup.string().required(),
  });

  const [initialState, setInitialState] = useState<SampleObject>({
    title: "",
    description: "",
    date: "",
    category: "",
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
        initialValues={initialState}
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
              <MyTextArea
                name="description"
                placeholder="description"
                rows={3}
              />
              <MyDateInput
                placeholderText="Date"
                name="date"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyyy"
              />
              <MySelectInput
                options={categoryOptions}
                placeholder="Category"
                name="category"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                disabled={isSubmitting || !dirty || !isValid}
                type="submit"
                variant="success"
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
