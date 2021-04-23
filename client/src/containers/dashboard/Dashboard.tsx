import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { RootState } from "reduxState/store";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const userData = useSelector((state: RootState) => state.loginUser.userData);
  // Display invites and teams
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
