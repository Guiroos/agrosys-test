import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useApplicationContext } from "../../context/ApplicationContext";

import {
  AddAddressModal,
  FloatDownloadButton,
  Header,
  LoadingPage,
} from "../../components";

import {
  deleteAddressDB,
  favoriteAddressDB,
  getClientAddressesDB,
  getClientByIdDB,
  insertAddressDB,
} from "../../utils/alasql";

import StartFill from "../../assets/svg/StarFill.svg";
import Star from "../../assets/svg/Star.svg";
import { validateFormValues } from "../../utils/validateFormValues";

function Addresses() {
  const { handlePageLoading, pageLoading, refresh, handleRefresh } =
    useApplicationContext();

  let { id } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState({});
  const [clientAddresses, setClientAddresses] = useState([]);
  const [addAddressModal, setAddAddressModal] = useState(false);

  const handleAddNewAddress = (address) => {
    handlePageLoading(true);

    if (!address) {
      return;
    }

    if (validateFormValues(address, "address")) {
      alert("Por favor, preencha todos os campos.");
      handlePageLoading(false);
      return;
    }

    address["client_id"] = Number(client.id);
    address["favorite"] = address.favorite ? 1 : 0;

    const addNewAddress = insertAddressDB(address);

    if (!addNewAddress) {
      alert("Erro ao adicionar endereço");
      handlePageLoading(false);
      return;
    }

    alert("Endereço adicionado com sucesso");
    handleRefresh();
    handleAddAddressModal(false);
    handlePageLoading(false);
  };

  const handleDeleteAddress = (address) => {
    handlePageLoading(true);

    if (!address) {
      alert("Erro ao deletar endereço");
      handlePageLoading(false);
      return;
    }

    deleteAddressDB(address.id);

    alert("Cliente deletado com sucesso");
    handleRefresh();
    handlePageLoading(false);
  };

  const handleFavoriteAddress = (addressId) => {
    handlePageLoading(true);

    if (!client || !addressId) {
      alert("Erro ao favoritar endereço");
      handlePageLoading(false);
      return;
    }

    favoriteAddressDB(addressId, client.id);

    alert("Endereço favoritado com sucesso");
    handleRefresh();
    handlePageLoading(false);
  };

  const handleAddAddressModal = (state) => {
    setAddAddressModal(state);
  };

  useEffect(() => {
    handlePageLoading(true);

    if (!id) {
      handlePageLoading(false);
      return;
    }

    try {
      const clientAddressesDB = getClientAddressesDB(id);
      setClientAddresses(clientAddressesDB);
      handlePageLoading(false);
    } catch (error) {
      console.error("🚀 ~ Clients ~ error", error);
    }
  }, [id, refresh]);

  useEffect(() => {
    handlePageLoading(true);

    if (!id) {
      handlePageLoading(false);
      return;
    }

    try {
      const clientDB = getClientByIdDB(id);

      if (!clientDB.length) {
        handlePageLoading(false);
        navigate("/dashboard/clientes");
        return;
      }

      setClient(clientDB[0]);
      handlePageLoading(false);
    } catch (error) {
      console.error("🚀 ~ Clients ~ error", error);
    }
  }, [id]);

  return (
    <div className="">
      <Header />

      {pageLoading && <LoadingPage />}

      <AddAddressModal
        showModal={addAddressModal}
        handleAddAddressModal={handleAddAddressModal}
        handleAddNewAddress={handleAddNewAddress}
      />

      <div className="container">
        <div className="d-flex row justify-content-between">
          <div className="d-flex justify-content-between mb-5">
            <h2>Lista de Endereços</h2>

            <button
              className="btn btn-success"
              onClick={() => handleAddAddressModal(true)}
            >
              Adicionar Endereço
            </button>
          </div>

          <div className="mb-2">
            <h5>Cliente: {client.full_name}</h5>
            <p>CPF: {client.cpf}</p>
          </div>

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr className="table-secondary">
                  <th style={{ width: "50px", textAlign: "center" }}>
                    <img src={Star} />
                  </th>
                  <th>CEP</th>
                  <th>Rua</th>
                  <th>Bairro</th>
                  <th>Cidade</th>
                  <th>Estado</th>
                  <th>País</th>
                  <th style={{ width: "100px" }}>Ações</th>
                </tr>
              </thead>

              <tbody>
                {clientAddresses.map((address) => (
                  <tr key={client.id}>
                    <td>
                      <button
                        className="btn"
                        onClick={() => handleFavoriteAddress(address.id)}
                      >
                        {address.favorite ? (
                          <img src={StartFill} />
                        ) : (
                          <img src={Star} />
                        )}
                      </button>
                    </td>
                    <td>{address.zip_code}</td>
                    <td>{address.street}</td>
                    <td>{address.neighborhood}</td>
                    <td>{address.city}</td>
                    <td>{address.state}</td>
                    <td>{address.country}</td>
                    <td>
                      <button
                        className="btn btn-danger w-100"
                        onClick={() => handleDeleteAddress(address)}
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <FloatDownloadButton />
    </div>
  );
}

export default Addresses;
