import { Fragment } from "react";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import Login from "../pages/Login";
import useAuth from "../hooks/useAuth";
import Cadastrar from "../pages/FormCadastro";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Private = ({ Item }) => {
  const {signed} = useAuth();
  return signed > 0 ? <Item /> : <Login />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/admin-dashboard/*" element={<Private Item={AdminRoutes} />} />
          <Route exact path="/user-dashboard/*" element={<Private Item={UserRoutes} />} />
          <Route exact path="/registre-se" element={<Cadastrar />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="*" element={<Login />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;