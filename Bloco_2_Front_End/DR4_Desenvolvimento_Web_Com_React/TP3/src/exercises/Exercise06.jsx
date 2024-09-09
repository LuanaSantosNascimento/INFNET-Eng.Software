import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Exercise06 = () => {
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
    setDados(JSON.stringify(dados, null, 2));
    console.log("Dados enviados!");
    console.log(dados);
  };

  return (
    <div className="container">
      <h1>Exercício 06</h1>
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

export default Exercise06;
