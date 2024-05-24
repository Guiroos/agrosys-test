import { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { FloatingLabel, Form } from "react-bootstrap";

import { useDatabaseContext } from "../../context/DatabaseContext";
import { useApplicationContext } from "../../context/ApplicationContext";

import LoadingPage from "../../components/LoadingPage/LoadingPage";

import { insertDatabase, loginUserDB } from "../../utils/alasql";

import GearFill from "../../assets/svg/GearFill.svg";
import "./Login.css";

function Login() {
  const { handlePageLoading, pageLoading, handleToken } =
    useApplicationContext();
  const { dbLoading } = useDatabaseContext();

  const navigate = useNavigate();
  const inputFile = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => setUsername(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    handlePageLoading(true);

    e.preventDefault();

    const userDB = loginUserDB(username, password);

    if (!userDB) {
      alert("Usuário ou senha incorretos");
      handlePageLoading(false);
      return;
    }

    alert("Login efetuado com sucesso");
    localStorage.setItem("token", "validated");
    handleToken("validated");
    handlePageLoading(false);
    navigate("/dashboard/clientes");
  };

  const handleInput = () => {
    inputFile.current.click();
  };

  const handleUploadFile = (e) => {
    const { files } = e.target;

    if (files?.length) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileContent = event.target.result;

        try {
          const jsonData = JSON.parse(fileContent);
          // Process the JSON data here

          insertDatabase(jsonData);
          alert("Arquivo carregado com sucesso");
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };

      reader.readAsText(file);
    }

    e.target.value = null;
  };

  return (
    <div className="vh-100 d-flex">
      {(pageLoading || dbLoading) && <LoadingPage />}

      <div className="login container m-auto d-flex row align-items-center align-content-center justify-content-center p-5 bg-primary shadow">
        <div className="mb-5 d-flex justify-content-between">
          <h1 className="fw-bold text-light">Bem vindo!</h1>

          <button className="btn" onClick={handleInput}>
            <input
              hidden
              ref={inputFile}
              type="file"
              onChange={handleUploadFile}
            />

            <img alt="Adicionar dados" src={GearFill} width={24} />
          </button>
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
          </FloatingLabel>

          <FloatingLabel
            controlId="formBasicPassword"
            className="mb-2"
            label="Senha"
          >
            <Form.Control
              type="password"
              placeholder=""
              value={password}
              onChange={onChangePassword}
            />
          </FloatingLabel>

          <div className="mb-5">
            <p className="text-light fs-5">
              Não tem uma conta?{" "}
              <a href="/cadastro" className="text-light">
                Registre-se
              </a>
            </p>
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-lg btn-light">
              Entrar
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
