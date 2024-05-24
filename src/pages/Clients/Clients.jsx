import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useApplicationContext } from "../../context/ApplicationContext";

import {
  AddClientModal,
  FloatDownloadButton,
  Header,
  LoadingPage,
} from "../../components";

import {
  deleteClientDB,
  getAllClientsDB,
  insertClientDB,
} from "../../utils/alasql";
import { validateFormValues } from "../../utils/validateFormValues";

function Clients() {
  const { handlePageLoading, pageLoading, refresh, handleRefresh } =
    useApplicationContext();

  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [addClientModal, setAddClientModal] = useState(false);

  const handleAddNewClient = (client) => {
    handlePageLoading(true);

    if (!client) {
      return;
    }

    if (validateFormValues(client, "client")) {
      alert("Por favor, preencha todos os campos.");
      handlePageLoading(false);
      return;
    }

    const addNewClient = insertClientDB(client);

    if (!addNewClient) {
      alert("Erro ao adicionar cliente");
      handlePageLoading(false);
      return;
    }

    alert("Cliente adicionado com sucesso");
    handleRefresh();
    handleAddClientModal(false);
    handlePageLoading(false);
  };

  const handleDeleteClient = (client) => {
    handlePageLoading(true);

    if (!client) {
      alert("Erro ao deletar cliente ou CPF já cadastrado.");
      handlePageLoading(false);
      return;
    }

    deleteClientDB(client.id);

    alert("Cliente deletado com sucesso");
    handleRefresh();
    handlePageLoading(false);
  };

  const handleAddClientModal = (state) => {
    setAddClientModal(state);
  };

  useEffect(() => {
    handlePageLoading(true);

    try {
      const clientsDB = getAllClientsDB();
      setClients(clientsDB);
      handlePageLoading(false);
    } catch (error) {
      console.error("🚀 ~ Clients ~ error", error);
    }
  }, [refresh]);

  return (
    <div>
      <Header />

      {pageLoading && <LoadingPage />}

      <AddClientModal
        showModal={addClientModal}
        handleAddClientModal={handleAddClientModal}
        handleAddNewClient={handleAddNewClient}
      />

      <div className="container">
        <div className="d-flex row justify-content-between">
          <div className="d-flex justify-content-between mb-5">
            <h2>Lista de Clientes</h2>

            <button
              className="btn btn-success"
              onClick={() => handleAddClientModal(true)}
            >
              Adicionar Cliente
            </button>
          </div>

          <div></div>

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr className="table-secondary">
                  <th className="w-25">Nome</th>
                  <th>CPF</th>
                  <th>Nascimento</th>
                  <th>Telefone</th>
                  <th>Celular</th>
                  <th style={{ width: "100px" }}>Endereços</th>
                  <th style={{ width: "100px" }}>Ações</th>
                </tr>
              </thead>

              <tbody className="">
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.full_name}</td>
                    <td>{client.cpf}</td>
                    <td>{client.birthdate}</td>
                    <td>{client.telephone}</td>
                    <td>{client.cellphone}</td>
                    <td>
                      <button
                        className="btn btn-secondary w-100"
                        onClick={() => navigate(`${client.id}/endereços`)}
                      >
                        Ver
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger w-100"
                        onClick={() => handleDeleteClient(client)}
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

export default Clients;
