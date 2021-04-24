import React from "react";
import { Modal } from "react-bootstrap";

const RaportsModal = (props: any) => {
  return (
    <Modal size="lg" {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton className="text-center">
        <Modal.Title className="w-100 text-center ml-6">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="mb-6">{props.children}</Modal.Body>
    </Modal>
  );
};

export default RaportsModal;
