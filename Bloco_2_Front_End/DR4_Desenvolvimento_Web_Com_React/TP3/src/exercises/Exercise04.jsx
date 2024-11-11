import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Exercise04 = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleEnviar = (dados) => {
    console.log("Dados enviados!");
    console.log("Nome: " + dados.nome);
    console.log("Telefone: " + dados.telefone);

    reset();
  };

  return (
    <div className="container">
      <h1>Exercício 04</h1>
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
            validate: (telefone) => {
              if (isNaN(telefone)) {
                return "Informe apenas números no campo 'telefone'.";
              }
              return true;
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
    </div>
  );
};

export default Exercise04;
