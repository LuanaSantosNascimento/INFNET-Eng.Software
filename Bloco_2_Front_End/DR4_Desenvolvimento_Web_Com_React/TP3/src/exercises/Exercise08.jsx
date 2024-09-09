import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Exercise08 = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [dados, setDados] = useState(null);

  const handleEnviar = (dados) => {
    mostrarDadosColetados(dados);
    reset();
  };

  const mostrarDadosColetados = (dados) => {
    setDados(JSON.stringify(dados, null, 3));
    console.log("Dados enviados!");
    console.log(dados);
  };

  return (
    <div className="container">
      <h1>Exercício 08</h1>
      <form onSubmit={handleSubmit(handleEnviar)}>
        <input
          {...register("nome", {
            required:
              "O campo 'nome' é obrigatório, preencha-o para continuar com a operação.",
          })}
          type="text"
          placeholder="Insira seu nome..."
          className="input"
        />
        {errors.nome && <p>{errors.nome.message}</p>}

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
          type="text"
          placeholder="Insira seu email..."
          className="input"
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          {...register("telefone", {
            required:
              "O campo 'telefone' é obrigatório, preencha-o para continuar com a operação.",
            pattern: {
              value: /^\d+$/,
              message: "Informe apenas números no campo 'telefone'.",
            },
          })}
          type="text"
          placeholder="Insira seu telefone..."
          className="input"
        />
        {errors.telefone && <p>{errors.telefone.message}</p>}

        <button type="submit" className="botao submit-azul">
          Enviar
        </button>
      </form>
      {dados && (
        <div>
          <h3>Dados em JSON:</h3>
          <p>{dados}</p>
        </div>
      )}
    </div>
  );
};

export default Exercise08;
