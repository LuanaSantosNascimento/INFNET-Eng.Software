import React, { useState, useEffect } from "react";
import { convertArrayToCSV } from "convert-array-to-csv";
import { downloadCSV } from "../CSV/csv";

import {
  Box,
  Typography,
  Fab,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Collapse,
  IconButton,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { formatarData } from "../../../servicos/utils/StringFormatter";
import {
  excluirRegistroPorID,
  deleteCotacoesPorIDRequisicao,
} from "../../../servicos/firebase/FirebaseServices";

export function Row({
  row,
  onCotacaoCadastrada,
  onDadosLinhaSelecionada,
  listaCotacoesRelacionadas,
  onHandleUpdate,
}) {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleAddCotacao = (dados) => {
    onDadosLinhaSelecionada(dados);
    onCotacaoCadastrada();
  };

  const handleDeleteCotacao = (dados) => {
    onDadosLinhaSelecionada(dados);
    excluirRegistroPorID(dados.id, "requisicoes-compra");
    deleteCotacoesPorIDRequisicao(dados.id);
    onHandleUpdate();
  };

  const handleExportarCotacao = (requisicao) => {
    downloadCSV(requisicao, listaCotacoesRelacionadas);
  };

  useEffect(() => {
    const carregarDados = async () => {
      const userTokenAdmin = JSON.parse(
        localStorage.getItem("user_token")
      ).admin;
      setIsAdmin(userTokenAdmin);
    };
    carregarDados();
  }, []);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="left">{formatarData(row.requisicao.data)}</TableCell>
        <TableCell align="left">{row.produto.nome}</TableCell>
        <TableCell align="left">{row.usuario.nome}</TableCell>  
        <TableCell align="left">{row.requisicao.quantidade}</TableCell>  
        <TableCell align="left">{row.requisicao.status}</TableCell>  
        <TableCell align="right">
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            {isAdmin &&
            (row.requisicao.status === "Em Aberto" ||
              row.requisicao.status === "Em Cotação") ? (
              <Tooltip title="Adicionar Cotação">
                <Fab
                  color="primary"
                  size="medium"
                  aria-label="add"
                  onClick={() => handleAddCotacao(row)}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            ) : null}

            <Tooltip title="Excluir Requisição">
              <Fab
                style={{
                  backgroundColor: "#d23927",
                  "&:hover": {
                    backgroundColor: "#ac0000",
                  },
                }}
                size="medium"
                aria-label="delete"
                onClick={() => handleDeleteCotacao(row)}
              >
                <DeleteIcon style={{ color: "white" }} />
              </Fab>
            </Tooltip>
            {listaCotacoesRelacionadas.length > 0 ? (
              <Tooltip title="Exportar Cotações">
                <Fab
                  color="secondary"
                  size="medium"
                  aria-label="export"
                  onClick={() => handleExportarCotacao(row)}
                >
                  <SaveAltIcon />
                </Fab>
              </Tooltip>
            ) : null}
          </Box>
        </TableCell>
         
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {listaCotacoesRelacionadas.length > 0 ? (
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Cotações
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">Data</TableCell>
                      <TableCell align="center">Fornecedor</TableCell>
                      <TableCell align="center">Quantidade</TableCell>
                      <TableCell align="center">Preço Unitário</TableCell>
                      <TableCell align="center">Valor Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listaCotacoesRelacionadas.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell />
                        <TableCell align="center">{c.id}</TableCell>
                        <TableCell align="center">
                          {formatarData(c.cotacao.data)}
                        </TableCell>
                        <TableCell align="center">
                          {c.fornecedor.nome}
                        </TableCell>
                        <TableCell align="center">
                          {c.cotacao.quantidade}
                        </TableCell>
                        <TableCell align="center">
                          R$ {c.cotacao.precoUnitario}
                        </TableCell>
                        <TableCell align="center">
                          R$ {c.cotacao.valorTotalCotacao}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            ) : (
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Não foram encontradas cotações para esta requisição.
                </Typography>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
