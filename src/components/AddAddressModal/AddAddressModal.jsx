import PropTypes from "prop-types";

import { useState } from "react";

import { Form, Modal } from "react-bootstrap";

function AddAddressModal({
  showModal,
  handleAddAddressModal,
  handleAddNewAddress,
}) {
  const [newAddress, setNewAddress] = useState({
    zip_code: "",
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "",
    favorite: false,
  });

  const handleNewAddress = (event) => {
    setNewAddress({
      ...newAddress,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <Modal
      centered
      show={showModal}
      onHide={() => handleAddAddressModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar um cliente</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Por favor, preencha as informações a seguir para criar um endereço.
        </p>

        <Form className="mt-3">
          <Form.Group className="mb-3" controlId="zip_code">
            <Form.Label>CEP</Form.Label>
            <Form.Control
              type="text"
              placeholder="CEP"
              value={newAddress.zip_code}
              onChange={handleNewAddress}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="street">
            <Form.Label>Rua</Form.Label>
            <Form.Control
              type="text"
              placeholder="Rua"
              value={newAddress.street}
              onChange={handleNewAddress}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="neighborhood">
            <Form.Label>Bairro</Form.Label>
            <Form.Control
              type="text"
              placeholder="Bairro"
              value={newAddress.neighbourhood}
              onChange={handleNewAddress}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="city">
            <Form.Label>Cidade</Form.Label>
            <Form.Control
              type="text"
              placeholder="Cidade"
              value={newAddress.city}
              onChange={handleNewAddress}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="state">
            <Form.Label>Estado</Form.Label>
            <Form.Control
              type="text"
              placeholder="Estado"
              value={newAddress.state}
              onChange={handleNewAddress}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="country">
            <Form.Label>País</Form.Label>
            <Form.Control
              type="text"
              placeholder="País"
              value={newAddress.country}
              onChange={handleNewAddress}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="favorite">
            <Form.Check
              type="checkbox"
              label="Endereço Favorito"
              checked={newAddress.favorite}
              onChange={() =>
                setNewAddress({
                  ...newAddress,
                  favorite: !newAddress.favorite,
                })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => handleAddAddressModal(false)}
        >
          Fechar
        </button>

        <button
          className="btn btn-success"
          onClick={() => handleAddNewAddress(newAddress)}
        >
          Adicionar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

AddAddressModal.propTypes = {
  showModal: PropTypes.bool,
  handleAddAddressModal: PropTypes.func,
  handleAddNewAddress: PropTypes.func,
};

export default AddAddressModal;
