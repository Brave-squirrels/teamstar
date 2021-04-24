import React from "react";
import { Modal } from "react-bootstrap";

const InviteModal = (props: any) => {
  return (
    <Modal style={{border: "1px red solid !important"}} {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton className="text-center">
        <Modal.Title className="w-100 text-center ml-4">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="mb-4">{props.children}</Modal.Body>
    </Modal>
  );
};

export default InviteModal;
