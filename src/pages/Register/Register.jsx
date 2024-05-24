import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { FloatingLabel, Form } from "react-bootstrap";

import { useDatabaseContext } from "../../context/DatabaseContext";
import { useApplicationContext } from "../../context/ApplicationContext";

import LoadingPage from "../../components/LoadingPage/LoadingPage";

import { insertUserDB } from "../../utils/alasql";

import GoBack from "../../assets/svg/GoBack.svg";

import "./Register.css";

function Register() {
  const { handlePageLoading, pageLoading, handleToken } = useApplicationContext();
  const { dbLoading } = useDatabaseContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => setUsername(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    handlePageLoading(true);

    e.preventDefault();

    const register = insertUserDB(username, password);

    if (!register) {
      alert("Usuário já cadastrado");
      return;
    }

    alert("Cadastro efetuado com sucesso");
    handlePageLoading(false);
    localStorage.setItem("token", "validated");
    handleToken("validated");
    navigate("/dashboard/clientes");
  };

  return (
    <div className="vh-100 d-flex">
      {(pageLoading || dbLoading) && <LoadingPage />}

      <div className="register container m-auto d-flex row align-items-center align-content-center justify-content-center p-5 bg-primary shadow">
        <div className="d-flex mb-5">
          <button className="me-3 btn" onClick={() => navigate("/")}>
            <img src={GoBack} alt="Voltar" width={32} />
          </button>

          <h1 className="fw-bold text-light">Cadastro</h1>
        </div>

        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingEmail"
            className="mb-5"
            label="Usuário"
          >
            <Form.Control
              type="text"
              placeholder=""
              value={username}
              onChange={onChangeEmail}
            />
            <Form.Text className="text-light">
              Nós nunca compartilharemos seus dados com ninguém.
            </Form.Text>
          </FloatingLabel>

          <FloatingLabel
            controlId="formBasicPassword"
            className="mb-5"
            label="Senha"
          >
            <Form.Control
              type="password"
              placeholder=""
              value={password}
              onChange={onChangePassword}
            />
          </FloatingLabel>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-lg btn-light">
              Cadastrar
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
