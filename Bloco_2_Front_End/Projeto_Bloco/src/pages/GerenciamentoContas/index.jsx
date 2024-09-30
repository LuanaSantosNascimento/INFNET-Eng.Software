import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  lerDados,
  alterarRegistroPorID,
} from "../../servicos/firebase/FirebaseServices";
import { Row } from "./Row";
import "../../css/FormCadastrosCotacoes.css";

import {
  InputLabel,
  MenuItem,
  Button,
  Select,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
} from "@mui/material";

export default function GerenciarContas() {
  const [usuarios, setUsuarios] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState({});

  const [
    toggleExibirCampoModificarStatus,
    setToggleExibirCampoModificarStatus,
  ] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  //Buscar usuarios cadastrados
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const usuariosDB = await lerDados("usuarios");
        const idUsuarioLogado = JSON.parse(
          localStorage.getItem("user_token")
        ).id;
        const listaUsuarios = usuariosDB.filter(
          (user) => user.id !== idUsuarioLogado
        );

        setUsuarios(listaUsuarios);
      } catch (e) {
        console.error(`Erro ao tentar consultar dados da base ${e}`);
      }
    };
    carregarDados();
  }, [forceUpdate]);

  const handleForceUpdate = () => {
    setForceUpdate(!forceUpdate);
  };

  const toggleExibirCampo = () => {
    setToggleExibirCampoModificarStatus(!toggleExibirCampoModificarStatus);
  };

  const handleGerenciarUsuario = (dados) => {
    setUsuarioSelecionado(dados);
    setToggleExibirCampoModificarStatus(true);
  };

  //Atualizando Status
  const handleEnviar = async (dados) => {
    try {
      const dadosAtualizados = {
        admin: usuarioSelecionado.admin,
        criadoEm: usuarioSelecionado.criadoEm,
        email: usuarioSelecionado.email,
        nome: usuarioSelecionado.nome,
        status: usuarioSelecionado.status,
        ultimoLogin: usuarioSelecionado?.ultimoLogin,
        motivoBloqueioDesbloqueio: dados.motivoBloqueioDesbloqueio,
        ultimoBloqueioDesbloqueio:
          usuarioSelecionado?.ultimoBloqueioDesbloqueio,
      };
      await alterarRegistroPorID(
        usuarioSelecionado.id,
        "usuarios",
        dadosAtualizados
      );
      toggleExibirCampo();

      handleForceUpdate();
      reset();
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário", error);
    }
  };

  return (
    <div className="container-geral">
      {toggleExibirCampoModificarStatus && (
        <div className="container-formulario">
          <form onSubmit={handleSubmit(handleEnviar)} className="form-linha">
            <div className="form-coluna">
              <InputLabel className="custom-label">
                Informe o motivo do bloqueio/desbloqueio
              </InputLabel>
              <TextField
                color="secondary"
                type="text"
                variant="standard"
                {...register("motivoBloqueioDesbloqueio", {
                  required:
                    "O campo é obrigatório, preencha-o para continuar com a operação.",
                })}
                helperText={errors?.motivoBloqueioDesbloqueio?.message}
              />
            </div>

            <Button variant="contained" type="submit">
              Enviar
            </Button>
          </form>
        </div>
      )}

      {/*Tabela de usuários*/}
      {usuarios.length > 0 && !toggleExibirCampoModificarStatus && (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="left">Nome</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Tipo</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((row) => {
                return (
                  <Row
                    key={row.name}
                    row={row}
                    onHandleUsuarioSelecionado={handleGerenciarUsuario}
                    onHandleUpdate={handleForceUpdate}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
