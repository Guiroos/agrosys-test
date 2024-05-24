import PropTypes from "prop-types";

import { useState } from "react";

import { Form, Modal } from "react-bootstrap";

function AddClientModal({
  showModal,
  handleAddClientModal,
  handleAddNewClient,
}) {
  const [newClient, setNewClient] = useState({
    full_name: "",
    cpf: "",
    birthdate: "",
    telephone: "",
    cellphone: "",
  });

  const handleNewClient = (event) => {
    setNewClient({
      ...newClient,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <Modal centered show={showModal} onHide={() => handleAddClientModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar um cliente</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Por favor, preencha as informações a seguir para criar um cliente.
        </p>

        <Form className="mt-3">
          <Form.Group className="mb-3" controlId="full_name">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome"
              required
              value={newClient.full_name}
              onChange={handleNewClient}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="cpf">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              type="text"
              placeholder="CPF"
              required
              value={newClient.cpf}
              onChange={handleNewClient}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="birthdate">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control
              type="text"
              placeholder="DD/MM/AAAA"
              required
              value={newClient.birthdate}
              onChange={handleNewClient}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="telephone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="text"
              placeholder="DDD + Telefone"
              required
              value={newClient.telephone}
              onChange={handleNewClient}
            />
          </Form.Group>

          <Form.Group className="mb-5" controlId="cellphone">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              type="text"
              placeholder="DDD + Celular"
              required
              value={newClient.cellphone}
              onChange={handleNewClient}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => handleAddClientModal(false)}
        >
          Fechar
        </button>

        <button
          className="btn btn-success"
          onClick={() => handleAddNewClient(newClient)}
        >
          Adicionar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

AddClientModal.propTypes = {
  showModal: PropTypes.bool,
  handleAddClientModal: PropTypes.func,
  handleAddNewClient: PropTypes.func,
};

export default AddClientModal;
