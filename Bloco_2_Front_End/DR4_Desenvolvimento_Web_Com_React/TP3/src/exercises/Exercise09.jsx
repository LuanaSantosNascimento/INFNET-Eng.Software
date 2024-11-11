import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { cadastrarDados } from "../servicos/FirebaseConnection";

const Exercise09 = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [dados, setDados] = useState(null);

  const handleEnviar = (dados) => {
    cadastrarDadosColetados(dados);
    reset();
  };

  const cadastrarDadosColetados = async (dados) => {
    setDados(JSON.stringify(dados, null, 3));
    try {
      const idDocumento = await cadastrarDados(dados, "usuarios");
      alert(`Dados cadastrados com sucesso!`);
      console.log(`ID do registro gerado: ${idDocumento}`);
    } catch (e) {
      alert(`Erro ao cadastrar dados, veja os logs para mais informações.`);
      console.log("Erro ao cadastrar contato", e);
    }
  };

  return (
    <div className="container">
      <h1>Exercício 09</h1>
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
              value: /^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/,
              message:
                "Informe DDD e número de telefone no formato: (xx) xxxxx-xxxx'.",
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

export default Exercise09;
