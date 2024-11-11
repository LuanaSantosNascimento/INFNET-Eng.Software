import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { cadastrarDados, lerDados } from "../servicos/FirebaseConnection";
import DataTable from "react-data-table-component";

const Exercise11 = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [dadosUsuariosFirebase, setDadosUsuariosFirebase] = useState([]);

  const consultarUsuarios = async () => {
    try {
      const dados = await lerDados("usuarios");
      setDadosUsuariosFirebase(dados);
    } catch (e) {
      alert(`Erro ao consultar dados, veja os logs para mais informações.`);
      console.error(`Erro ao tentar consultar usuários ${e}`);
    }
  };

  useEffect(() => {
    consultarUsuarios();
  }, []);

  const handleEnviar = (dados) => {
    cadastrarDadosColetados(dados);
    consultarUsuarios();
    reset();
  };

  const cadastrarDadosColetados = async (dados) => {
    try {
      const idDocumento = await cadastrarDados(dados, "usuarios");
      alert(`Dados cadastrados com sucesso!`);
      console.log(`ID do registro gerado: ${idDocumento}`);
    } catch (e) {
      alert(`Erro ao cadastrar dados, veja os logs para mais informações.`);
      console.log("Erro ao cadastrar contato", e);
    }
  };

  const colunas = [
    {
      name: <span className="negrito">Nome</span>,
      selector: (row) => row.nome,
      sortable: true,
    },
    {
      name: <span className="negrito">Email</span>,
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: <span className="negrito">Telefone</span>,
      selector: (row) => row.telefone,
      sortable: true,
    },
  ];

  const opcoesPaginacao = {
    rowsPerPageText: "Linhas por página:",
    rangeSeparatorText: "de",
  };

  return (
    <div className="container">
      <h1>Exercício 11</h1>
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
          className="input"
          type="text"
          placeholder="Insira seu telefone..."
        />
        {errors.telefone && <p>{errors.telefone.message}</p>}

        <button type="submit" className="botao submit-azul">
          Enviar
        </button>
      </form>
      {dadosUsuariosFirebase && (
        <div>
          <h3>Usuários Cadastrados</h3>

          <DataTable
            columns={colunas}
            data={dadosUsuariosFirebase}
            pagination
            paginationPerPage={5}
            dense
            responsive
            striped
            paginationComponentOptions={opcoesPaginacao}
            defaultSortField="nome"
            selectableRowsHighlight
            selectableRowsSingle
          />
        </div>
      )}
    </div>
  );
};

export default Exercise11;
