import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function ModalComponent(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.data.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.data.subTitle}</h4>
          <p>
            {props.data.text}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default ModalComponent;
  