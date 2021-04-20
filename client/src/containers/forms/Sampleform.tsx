import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Card } from "react-bootstrap";
import MyTextInput from "components/form/MyTextInput";

interface SampleObject {
  sampleTitle: string;
  sampleDescription: string;
  sampleDate: Date | null;
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
    sampleDate: null,
  });

  const handleFormSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Card>
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
            <MyTextInput name="title" placeholder="title" />
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default SampleForm;
