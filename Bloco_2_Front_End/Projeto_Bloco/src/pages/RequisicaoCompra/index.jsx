import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  getDadosPorIdCustomizaddo,
  lerDados,
  cadastrarDados,
} from "../../servicos/firebase/FirebaseServices";
import Cotacoes from "../cadastros/FormCotacoes";
import { Row } from "./TableRow/Row";
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
import AddIcon from "@mui/icons-material/Add";

export default function RequisicaoCompra() {
  const [produtos, setProdutos] = useState([]);
  const [requisicoesCompra, setRequisicoesCompra] = useState([]);
  const [cotacoes, setCotacoes] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState();
  const [dadosBotao, setDadosBotao] = useState({
    texto: "Nova Requisição",
    cor: "success",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, defaultValues },
  } = useForm({
    defaultValues: {
      produto: null,
    },
  });
  const [requisicaoSelecionada, setRequisicaoSelecionada] = useState(null);
  const [toggleExibirFormCotacoes, setToggleExibirFormCotacoes] =
    useState(false);
  const [toggleExibirFormRequisicoes, setToggleExibirFormRequisicoes] =
    useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);

  const handleFormCadastroCotacao = () => {
    setToggleExibirFormCotacoes(!toggleExibirFormCotacoes);
  };

  const handleForceUpdate = () => {
    setForceUpdate(!forceUpdate);
  };

  const handlAdddDadosRequisicaoSelecionada = (dados) => {
    setRequisicaoSelecionada(dados);
  };

  //Buscar produtos cadastrados
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const produtosBase = await lerDados("produtos");
        setProdutos(produtosBase);
      } catch (e) {
        console.error(`Erro ao tentar consultar dados da base ${e}`);
      }
    };
    carregarDados();
  }, []);

  //Buscar requisicoes de compra
  useEffect(() => {
    const listarRequisicoesCompra = async () => {
      try {
        const dadosUsuarioLogado = JSON.parse(
          localStorage.getItem("user_token")
        );

        if (!dadosUsuarioLogado.admin) {
          const requisicoesColaborador = await getDadosPorIdCustomizaddo(
            dadosUsuarioLogado.id,
            "requisicoes-compra",
            "usuario.id",
            "requisicao.data"
          );
          setRequisicoesCompra(requisicoesColaborador);

          const cotacoesColaborador = await getDadosPorIdCustomizaddo(
            dadosUsuarioLogado.id,
            "cotacoes",
            "requisicao.idUsuario",
            "cotacao.data"
          );
          setCotacoes(cotacoesColaborador);
        } else {
          const requisicoesAdm = await lerDados(
            "requisicoes-compra",
            "requisicao.data"
          );
          setRequisicoesCompra(requisicoesAdm);

          const cotacoesAdm = await lerDados("cotacoes", "cotacao.data");
          setCotacoes(cotacoesAdm);
        }
      } catch (e) {
        console.error(`Erro ao tentar consultar dados da base ${e}`);
      }
    };
    listarRequisicoesCompra();
  }, [forceUpdate]);

  const handleEnviar = async (dados) => {
    try {
      let dadosUsuario = JSON.parse(localStorage.getItem("user_token"));
      const dadosRequisicao = {
        usuario: {
          id: dadosUsuario.id,
          nome: dadosUsuario.nome,
        },
        produto: {
          id: dados.produto.id,
          nome: dados.produto.nome,
        },
        requisicao: {
          data: new Date(),
          status: "Em Aberto",
          quantidade: dados.quantidade,
          descricao: dados.descricao,
        },
      };
      await cadastrarDados(dadosRequisicao, "requisicoes-compra");
      handleForceUpdate();
      setProdutoSelecionado("");
      reset();
    } catch (error) {
      //TODO MODAL DE ERRO
      console.error("Erro ao cadastrar fornecedor", error);
    }
  };
  const handleChange = (event) => {
    setProdutoSelecionado(event.target.value);
  };

  const filtrarCotacoesPorRequisicao = (cotacoes, idRequisicao) => {
    return cotacoes.filter((cotacao) => cotacao.requisicao.id === idRequisicao);
  };

  const handleFormRequisicao = () => {
    let dadosBotao;
    if (!toggleExibirFormRequisicoes) {
      dadosBotao = {
        texto: "Fechar Formulário",
        cor: "secondary",
      };
    } else {
      dadosBotao = {
        texto: "Nova Requisição",
        cor: "success",
      };
    }
    setToggleExibirFormRequisicoes(!toggleExibirFormRequisicoes);

    setDadosBotao(dadosBotao);
  };

  return (
    <div className="container-geral">
      {toggleExibirFormRequisicoes && (
        <div className="container-formulario">
          <form onSubmit={handleSubmit(handleEnviar)} className="form-linha">
            <div className="form-coluna">
              <InputLabel className="custom-label">Descrição</InputLabel>
              <TextField
                color="secondary"
                type="text"
                variant="standard"
                {...register("descricao", {
                  required:
                    "O campo 'descricao' é obrigatório, preencha-o para continuar com a operação.",
                })}
                helperText={errors?.descricao?.message}
              />

              <InputLabel className="custom-label">Quantidade</InputLabel>
              <TextField
                color="secondary"
                type="number"
                variant="standard"
                {...register("quantidade", {
                  required:
                    "O campo 'quantidade' é obrigatório, preencha-o para continuar com a operação.",
                })}
                helperText={errors?.quantidade?.message}
              />
            </div>

            <div className="form-coluna">
              <InputLabel className="custom-label">Status</InputLabel>
              <TextField
                disabled
                color="secondary"
                type="text"
                variant="standard"
                defaultValue="Em aberto"
              />
              <InputLabel className="custom-label" id="select-produto">
                Produto
              </InputLabel>
              <Select
                labelId="select-produto"
                label="Produto"
                value={produtoSelecionado}
                onChange={handleChange}
                {...register("produto", {
                  required:
                    "O campo 'produto' é obrigatório, preencha-o para continuar com a operação.",
                })}
                helperText={errors?.produto?.message}
              >
                {produtos.map((p) => (
                  <MenuItem key={p.nome} value={p}>
                    {p.nome}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <Button variant="contained" type="submit">
              Enviar
            </Button>
          </form>
        </div>
      )}

      {/*Form cadastro de cotação*/}
      {toggleExibirFormCotacoes && (
        <Cotacoes
          props={requisicaoSelecionada}
          onCotacaoCadastrada={handleFormCadastroCotacao}
          onHandleUpdate={handleForceUpdate}
        />
      )}

      <Button
        variant="outlined"
        color={dadosBotao.cor}
        startIcon={<AddIcon />}
        onClick={handleFormRequisicao}
      >
        {dadosBotao.texto}
      </Button>
      {/*Tabela de cotações*/}
      {requisicoesCompra && requisicoesCompra.length > 0 && (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Aberto Em</TableCell>
                <TableCell align="left">Produto</TableCell>
                <TableCell align="left">Usuario</TableCell>
                <TableCell align="left">Quantidade</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {requisicoesCompra.map((row) => {
                const cotacoesRelacionadas = filtrarCotacoesPorRequisicao(
                  cotacoes,
                  row.id
                );

                return (
                  <Row
                    key={row.name}
                    row={row}
                    onCotacaoCadastrada={handleFormCadastroCotacao}
                    onDadosLinhaSelecionada={
                      handlAdddDadosRequisicaoSelecionada
                    }
                    listaCotacoesRelacionadas={cotacoesRelacionadas}
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
