import React from "react";
import { Modal } from "react-bootstrap";

const InviteModal = (props: any) => {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton className="text-center">
        <Modal.Title className="w-100 text-center ml-4">
          Send Invite
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="mb-4">{props.children}</Modal.Body>
    </Modal>
  );
};

export default InviteModal;
