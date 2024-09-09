import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ObterEnderecoViaCep } from "../servicos/ConsultaCep";
import "../styles.css";

const Exercise16 = () => {
  const [endereco, setEndereco] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function consultarCEP(dados) {
    try {
      const retornoEndereco = await ObterEnderecoViaCep(dados.cep);
      console.log(retornoEndereco);
      setEndereco(retornoEndereco);
    } catch (error) {
      alert(`Erro ao consultar cep: ${error}`);
      reset();
    }
  }

  const handleConsultar = (dados) => {
    consultarCEP(dados);
    reset();
  };

  return (
    <div className="container">
      <h1>Exercício 16</h1>

      <form onSubmit={handleSubmit(handleConsultar)}>
        <input
          className="input"
          {...register("cep", {
            required:
              "O campo 'cep' é obrigatório, preencha-o para continuar com a operação.",
            pattern: {
              value: /^\d{8}$/,
              message:
                "Por favor, insira apenas números para continuar a operação.",
            },
          })}
          type="text"
          placeholder="Insira seu cep..."
        />
        {errors.cep && <p>{errors.cep.message}</p>}
        <button type="submit" className="botao submit-verde">
          Consultar Endereço
        </button>
      </form>
      {endereco && (
        <div className="dados-container">
          <p>
            <strong>Logradouro: </strong>
            {endereco.logradouro}
          </p>
          <p>
            <strong>Bairro: </strong>
            {endereco.bairro}
          </p>

          <p>
            <strong>Estado: </strong>
            {endereco.estado}
          </p>
          <p>
            <strong>CEP: </strong>
            {endereco.cep}
          </p>
          <p>
            <strong>Região: </strong>
            {endereco.regiao}
          </p>

          <p>
            <strong>DDD: </strong>
            {endereco.ddd}
          </p>
        </div>
      )}
    </div>
  );
};

export default Exercise16;
