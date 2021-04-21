import axios from "axios";
import React from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";

const TestErrors = () => {
  const baseUrl = "http://localhost:5000/errors/";

  function handleNotFound() {
    axios.get(baseUrl + "notFound").catch((err) => console.log(err.response));
  }

  function handleBadRequest() {
    axios.get(baseUrl + "badRequest").catch((err) => console.log(err.response));
  }

  function handleServerError() {
    axios
      .get(baseUrl + "serverError")
      .catch((err) => console.log(err.response));
  }

  function handleUnauthorized() {
    axios
      .get(baseUrl + "unauthorized")
      .catch((err) => console.log(err.response));
  }

  return (
    <Container>
      <ButtonGroup>
        <Button onClick={handleNotFound}>Not found</Button>
        <Button onClick={handleBadRequest}>Bad Request</Button>
        <Button onClick={handleServerError}>Server Error</Button>
        <Button onClick={handleUnauthorized}>Unauthorized</Button>
      </ButtonGroup>
    </Container>
  );
};

export default TestErrors;
