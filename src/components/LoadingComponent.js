import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";

function LoadingComponent() {
  return (

      <Modal show = {true} centered backdrop="static"> 
        <Modal.Header>
          <Modal.Title>Loading...</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">
              Please wait while we process your request.
            </span>
          </Spinner>
        </Modal.Body>
      </Modal>
  );
}
export default LoadingComponent;
