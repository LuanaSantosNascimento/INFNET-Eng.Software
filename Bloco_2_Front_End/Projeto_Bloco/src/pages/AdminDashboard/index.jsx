import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../componentes/Button";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import AdminMenu from "./Menu";

const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <AdminMenu/>
      <C.Container>
    </C.Container>
    </>

  );
};

export default Home;