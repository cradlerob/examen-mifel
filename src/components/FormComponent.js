import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingComponent from "./LoadingComponent";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ModalComponent from "./ModalComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemTable from "./ItemTable";

function FormComponent() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    title: "Error",
    subTitle: "Error",
    text: "Error",
  });
  const handleClose = () => setShowModal(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === true) {
      const formData = new FormData(form);
      let formDataObject= getData(formData);

      console.log("formDataObject",formDataObject);
      axios
      .post("http://httpbin.org/post", formDataObject)
      .then((response) => {
        setData(response.data);
        console.log(data);
        setModalData({
          title: "Exito",
          subTitle: "Registro Exitoso",
          text: "El registro se ha guardado correctamente.",
        });
        setShowModal(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });

    }else{
      
      event.stopPropagation();
      setModalData({
        title: "Error",
        subTitle: "Error",
        text: "Porfavor verifique los campos resaltados en rojo.",
      });
      setShowModal(true);
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {loading && <LoadingComponent />}
      <ModalComponent show={showModal} onHide={handleClose} data={modalData}/>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="Nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control name="nombre"
            required
            type="text"
            placeholder="Nombre"
            minLength={6}
            pattern="[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"
          />
          <Form.Control.Feedback type="invalid">
              Porfavor ingrese un Nombre
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationMidName">
          <Form.Label> Primer apellido</Form.Label>
          <Form.Control
            name="primerApellido"
            required
            type="text"
            placeholder="Primer Apellido"
            minLength={6}
            pattern="[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"
          />
          <Form.Control.Feedback type="invalid">
              Porfavor ingrese un Primer apellido
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationLastName">
          <Form.Label>Segundo apellido</Form.Label>
            <Form.Control
              name="segundoApellido"
              type="text"
              placeholder="Segundo apellido"
              pattern="[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"
              required
              minLength={6}
            />
            <Form.Control.Feedback type="invalid">
              Porfavor ingrese un Segundo apellido
            </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="curp">
          <Form.Label>CURP</Form.Label>
          <Form.Control name="curp" type="text" placeholder="CURP" required
          minLength={18} maxLength={18}
          pattern="([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$"/>
          <Form.Control.Feedback type="invalid">
            Porfavor introduzca una CURP Válida.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="rfc">
          <Form.Label>RFC</Form.Label>
          <Form.Control name="rfc" type="text" placeholder="RFC" required
          pattern="([A-Z]{3,4})(\d{2})(\d{2})(\d{2})([0-9A-Z]{3})$" minLength={14} maxLength={14}/>
          <Form.Control.Feedback type="invalid" >
            Ingrese un RFC Correcto
          </Form.Control.Feedback>
        </Form.Group>
        </Row>
        <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="CodigoPostal" required>
          <Form.Label>Código Postal</Form.Label>
          <Form.Control name="codigoPostal" type="text" placeholder="Código Postal" required pattern="^[0-9]{5}$" minLength={5} maxLength={5}/>
          <Form.Control.Feedback type="invalid">
            Ingrese un código postal válido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="9" controlId="Calle">
          <Form.Label>Calle</Form.Label>
          <Form.Control name="calle" type="text" placeholder="Calle" required minLength={10}/>
          <Form.Control.Feedback type="invalid">
            Ingrese una calle válida
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="NumeroExterior">
          <Form.Label>Número Exterior</Form.Label>
          <Form.Control name="numeroExterior" type="text" required pattern="^[0-9]{1,5}$" maxLength={5}/>
          <Form.Control.Feedback type="invalid">
            Ingrese un número exterior válido
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="NumeroInterior">
          <Form.Label>Número Interior</Form.Label>
          <Form.Control name="numeroInterior" type="text" placeholder="Número Interior" />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="Estado">
          <Form.Label>Estado</Form.Label>
          <Form.Control name="estado" type="text" required minLength={5}
          pattern="[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"/>
          <Form.Control.Feedback type="invalid">
            Ingrese un estado válido
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} md="4" controlId="Delegacion">
          <Form.Label>Delegación/Municipio</Form.Label>
          <Form.Control name="delegacion" type="text" required minLength={5}
          pattern="[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"/>
          <Form.Control.Feedback type="invalid">
            Ingrese un/a Delegación/Municipio válido
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="Colonia">
          <Form.Label>Colonia</Form.Label>
          <Form.Control name="Colonia" type="text" required minLength={5}
          pattern="[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"/>
          <Form.Control.Feedback type="invalid">
            Ingrese una Colonia válido
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <ItemTable setLoading={setLoading} />
      <Button className="btn btn-primary btn-large centerButton" type="submit">Guardar</Button>
    </Form>
  );
}

function getData(formData) {
  const infoUsuario = {
    nombre: formData.get("nombre"),
    primerApellido: formData.get("primerApellido"),
    segundoApellido: formData.get("segundoApellido"),
    curp: formData.get("curp"),
    rfc: formData.get("rfc"),
  };
  const domicilio = {
    codigoPostal: formData.get("codigoPostal"),
    calle: formData.get("calle"),
    numeroExterior: formData.get("numeroExterior"),
    numeroInterior: formData.get("numeroInterior"),
    estado: formData.get("estado"),
    delegacion: formData.get("delegacion"),
    colonia: formData.get("Colonia"),
  };
  return { infoUsuario, domicilio };
}

export default FormComponent;
