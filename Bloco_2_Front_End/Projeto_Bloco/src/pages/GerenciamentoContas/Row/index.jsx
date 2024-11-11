import React, { useState, useEffect } from "react";

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
import BlockIcon from "@mui/icons-material/Block";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { formatarData } from "../../../servicos/utils/StringFormatter";

export function Row({ row, onHandleUsuarioSelecionado, onHandleUpdate }) {
  const [open, setOpen] = useState(false);
  const [isDisabledDesbloquearUsuario, setIsDisabledDesbloquearUsuario] =
    useState(true);
  const [isDisabledBloquearUsuario, setIsDisabledBloquearUsuario] =
    useState(false);

  const handleBloquearUsuario = (dados) => {
    let usuarioBloqueado = dados;
    usuarioBloqueado.status = "Bloqueado";
    usuarioBloqueado.ultimoBloqueioDesbloqueio = new Date();

    onHandleUsuarioSelecionado(usuarioBloqueado);
    onHandleUpdate();
  };

  const toggleExibicaoBotoes = () => {
    setIsDisabledDesbloquearUsuario(!isDisabledDesbloquearUsuario);
    setIsDisabledBloquearUsuario(!isDisabledBloquearUsuario);
  };

  const definirExibicaoBotoes = async (dado) => {
    if (dado?.status === "Bloqueado") {
      setIsDisabledDesbloquearUsuario(false);
      setIsDisabledBloquearUsuario(true);
    } else {
      setIsDisabledDesbloquearUsuario(true);
      setIsDisabledBloquearUsuario(false);
    }
  };

  useEffect(() => {
    definirExibicaoBotoes(row);
  }, [row]);

  const handleDesbloquearUsuario = (usuario) => {
    let usuarioDesbloqueado = usuario;
    usuarioDesbloqueado.status = "Ativo";
    usuarioDesbloqueado.ultimoBloqueioDesbloqueiotus = new Date();

    onHandleUsuarioSelecionado(usuarioDesbloqueado);
    onHandleUpdate();
  };

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
          {row.nome}
        </TableCell>
        <TableCell align="left">{row.email}</TableCell>  
        <TableCell align="left">
          {row.admin ? "Administrador" : "Colaborador"}
        </TableCell>
        <TableCell align="left">{row.status}</TableCell>
        <TableCell align="right">
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Tooltip title="Desbloquear Usuário">
              <Fab
                color="primary"
                size="medium"
                aria-label="unblock"
                disabled={isDisabledDesbloquearUsuario}
                onClick={() => handleDesbloquearUsuario(row)}
              >
                <AccountCircleIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Bloquear Usuário">
              <Fab
                color="secondary"
                size="medium"
                aria-label="block"
                disabled={isDisabledBloquearUsuario}
                onClick={() => handleBloquearUsuario(row)}
              >
                <BlockIcon />
              </Fab>
            </Tooltip>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalhes
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Data Criação</TableCell>
                    <TableCell align="center">Último Login</TableCell>
                    <TableCell align="center">
                      Motivo Bloqueio/Desbloqueio
                    </TableCell>
                    <TableCell align="center">
                      Data Bloqueio/Desbloqueio
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.id}>
                    <TableCell />
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">
                      {formatarData(row.criadoEm)}
                    </TableCell>
                    <TableCell align="center">
                      {formatarData(row?.ultimoLogin)}
                    </TableCell>
                    <TableCell align="center">
                      {row?.motivoBloqueioDesbloqueio}
                    </TableCell>
                    <TableCell align="center">
                      {formatarData(row?.ultimoBloqueioDesbloqueio)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
