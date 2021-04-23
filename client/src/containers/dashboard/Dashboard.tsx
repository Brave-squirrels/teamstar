import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button onClick={() => setShow(true)}>Open</Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>Testowy modal</Modal.Header>
        <Modal.Body>
          <p>Test cialo modala</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger">Button</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Dashboard;
