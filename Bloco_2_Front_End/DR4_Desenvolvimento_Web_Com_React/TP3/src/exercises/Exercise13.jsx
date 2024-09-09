import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  cadastrarDados,
  lerDados,
  getDadoPorID,
  excluirRegistroPorID,
} from "../servicos/FirebaseConnection";
import DataTable from "react-data-table-component";

const Exercise13 = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [dadosUsuariosFirebase, setDadosUsuariosFirebase] = useState([]);
  const [dadoSelecionado, setDadoSelecionado] = useState(null);
  const [uidDadoSelecionado, setUIDDadoSelecionado] = useState("");

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
  const deletarDadoSelecionado = async () => {
    try {
      await excluirRegistroPorID(uidDadoSelecionado, "usuarios");
      setDadoSelecionado(null);
      setUIDDadoSelecionado("");
      consultarUsuarios();
    } catch (e) {
      alert(`Erro ao deletar registro, veja os logs para mais informações.`);
      console.error(`Erro ao tentar consultar usuário ${e}`);
    }
  };
  const buscarDadoSelecionado = async (uid) => {
    try {
      const dadoEspecifico = await getDadoPorID(uid, "usuarios");
      if (dadoEspecifico.exists()) {
        setDadoSelecionado(dadoEspecifico.data());
        setUIDDadoSelecionado(uid);
        console.log(dadoEspecifico.data());
        return;
      }
      console.log("Nenhum dado retornado....");
    } catch (e) {
      alert(`Erro ao consultar dados, veja os logs para mais informações.`);
      console.error(`Erro ao tentar consultar usuário ${e}`);
    }
  };

  const handleBuscaPorId = (row) => {
    buscarDadoSelecionado(row.id);
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
      <h1>Exercício 13</h1>
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
            onRowClicked={handleBuscaPorId}
          />
        </div>
      )}
      {dadoSelecionado && (
        <div>
          <h4>Registro selecionado</h4>
          <p>
            <strong>Nome: </strong>
            {dadoSelecionado.nome}
          </p>
          <p>
            <strong>Email: </strong>
            {dadoSelecionado.email}
          </p>
          <p>
            <strong>Telefone: </strong>
            {dadoSelecionado.telefone}
          </p>
          <button
            onClick={() => deletarDadoSelecionado()}
            className="botao botao-excluir"
          >
            Excluir registro
          </button>
        </div>
      )}
    </div>
  );
};

export default Exercise13;
