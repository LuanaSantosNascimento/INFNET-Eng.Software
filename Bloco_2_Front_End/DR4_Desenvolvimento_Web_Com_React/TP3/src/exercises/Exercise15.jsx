import React from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "../styles.css";

const Exercise15 = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const realizarLogin = async (dados) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        dados.email,
        dados.senha
      );
      console.log(userCredentials);
      alert("Login realizado com sucesso!");
    } catch (erro) {
      alert(" Erro ao realizar login, veja os logs.");
      console.log(erro);
    }
  };

  const handleEnviar = async (dados) => {
    realizarLogin(dados);
    reset();
  };

  return (
    <div className="container">
      <h1>Exercício 15</h1>
      <form onSubmit={handleSubmit(handleEnviar)}>
        <input
          {...register("email", {
            required:
              "O campo 'email' é obrigatório, preencha-o para continuar com a operação.",
            pattern: {
              value:
                /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/,
              message:
                "O email informado não está em um formato válido. Corrija-o para continuar a operação.",
            },
          })}
          placeholder="Digite seu E-mail"
          type="text"
          className="input"
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          {...register("senha", {
            required:
              "O campo 'senha' é obrigatório, preencha-o para continuar com a operação.",
          })}
          type="password"
          placeholder="Digite sua senha"
          className="input"
        />
        {errors.senha && <p>{errors.senha.message}</p>}

        <button type="submit" className="botao submit-azul">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Exercise15;
//Login: teste@teste.com
//Senha: 123456789
