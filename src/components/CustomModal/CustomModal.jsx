import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CustomModal.css'; // Custom styling if needed

const CustomModal = ({ show, handleClose, message, title = 'Alert', buttonLabel = 'Close' }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {buttonLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
