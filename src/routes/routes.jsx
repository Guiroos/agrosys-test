import { useEffect } from "react";

import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useApplicationContext } from "../context/ApplicationContext";

import { Addresses, Clients, Login, Register } from "../pages";

export function AppRoutes() {
  const { handleToken } = useApplicationContext();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");

    handleToken(localStorageToken);

    if (location.pathname === "/" || location.pathname === "/cadastro") {
      return;
    }

    if (!localStorageToken) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace={true} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/dashboard/clientes" element={<Clients />} />
      <Route path="/dashboard/clientes/:id/endereços" element={<Addresses />} />
      <Route path="/*" element={<Navigate to="/login" replace={true} />} />
    </Routes>
  );
}
