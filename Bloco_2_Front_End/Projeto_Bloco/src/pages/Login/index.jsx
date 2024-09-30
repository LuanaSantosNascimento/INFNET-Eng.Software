import * as C from "./styles";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Input from "../../componentes/Input";
import Button from "../../componentes/Button";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = await signin(email, senha);

    if (res) {
      setError(res);
      return;
    }

    const userToken = localStorage.getItem("user_token");

    if (userToken) {
      const { admin } = JSON.parse(userToken);
      if (admin) {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    }
  };

  return (
    <C.Container>
      <C.Label>Realize o login para acessar o sistema.</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Entrar" onClick={handleLogin} />
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/registre-se">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Login;
