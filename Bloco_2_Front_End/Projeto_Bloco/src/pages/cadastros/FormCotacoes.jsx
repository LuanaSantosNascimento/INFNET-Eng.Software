import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { cadastrarDados } from "../../servicos/firebase/cadastrarDados";
import {
  getCotacoesPorIDRequisicao,
  getDadoPorID,
  alterarRegistroPorID,
} from "../../servicos/firebase/FirebaseServices";
import { lerDados } from "../../servicos/firebase/lerDados";
import "../../css/FormCadastrosCotacoes.css";
import { formatarData } from "../../servicos/utils/StringFormatter";

import { InputLabel, MenuItem, Button, Select, TextField } from "@mui/material";

export default function Cotacoes({ props, onCotacaoCadastrada, onHandleUpdate }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const [fornecedores, setFornecedores] = useState([]);
  const [razaoSocialFornecedor, setRazaoSocialFornecedor] = useState();

  const buscarCotacoesPorIDRequisicaoa = async (idRequisicao) => {
    try {
      return await getCotacoesPorIDRequisicao(idRequisicao);
    } catch (e) {
      console.error(`Erro ao tentar consultar dados da base ${e}`);
    }
  };

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const fornecedores = await lerDados("fornecedores");
        setFornecedores(fornecedores);
      } catch (e) {
        console.error(`Erro ao tentar consultar dados da base ${e}`);
      }
    };
    carregarDados();
  }, []);

  {
    /*

  useEffect(() => {
    if (quantidade && precoUnitario) {
      const valorTotal = parseInt(quantidade) * parseFloat(precoUnitario);
      setValorTotalCotacao(valorTotal.toFixed(2));
    } else {
      setValorTotalCotacao("");
    }
  }, [quantidade, precoUnitario]);
  */
  }

  const adicionarCotacao = async (dados) => {
    const cotacao = {
      produto: {
        id: props.produto.id,
        nome: props.produto.nome,
      },
      requisicao: {
        id: props.id,
        usuario: props.usuario.nome,
        idUsuario: props.usuario.id,
      },
      cotacao: {
        data: new Date(),
        quantidade: dados.quantidade,
        precoUnitario: dados.preco,
        valorTotalCotacao: calcularValorTotal(dados.quantidade, dados.preco),
      },
      fornecedor: {
        id: dados.fornecedor.id,
        nome: dados.fornecedor.razaoSocial,
      },
    };
    const idDocumento = await cadastrarDados(cotacao, "cotacoes");
    console.log(`ID do registro gerado: ${idDocumento}`);
  };

  const atualizarStatusRequisicao = async () => {
    let statusRequisicao = "Em aberto";

    const cotacoes = await buscarCotacoesPorIDRequisicaoa(props.id);
    if (cotacoes.length === 0) {
      statusRequisicao = "Em Aberto";
    } else if (cotacoes.length === 1 || cotacoes.length === 2) {
      statusRequisicao = "Em Cotação";
    } else {
      statusRequisicao = "Cotada";
    }

    const requisicao = await getDadoPorID(props.id, "requisicoes-compra");
    const novoDado = {
      produto: requisicao.produto,
      requisicao: {
        data: requisicao.requisicao.data,
        descricao: requisicao.requisicao.descricao,
        quantidade: requisicao.requisicao.quantidade,
        status: statusRequisicao,
      },
      usuario: requisicao.usuario,
    };

    await alterarRegistroPorID(props.id, "requisicoes-compra", novoDado);
  };

  const handleAddCotacao = async (dados) => {
    try {
      const cotacoesCadastradas = await buscarCotacoesPorIDRequisicaoa(
        props.id
      );

      if (cotacoesCadastradas.length <= 2) {
        await adicionarCotacao(dados);
        await atualizarStatusRequisicao();
      }
      reset();
      onCotacaoCadastrada();
      onHandleUpdate();
    } catch (e) {
      console.log("Erro ao cadastrar cotação", e);
    }
  };

  const calcularValorTotal = (quantidade, precoUnitario) => {
    return (parseInt(quantidade) * parseFloat(precoUnitario)).toFixed(2);
  };

  const handleChange = (event) => {
    setRazaoSocialFornecedor(event.target.value);
  };

  return (
    <div className="container-formulario">
      <h3>Nova Cotação</h3>

      <form onSubmit={handleSubmit(handleAddCotacao)} className="form-linha">
        <div className="form-coluna">
          <InputLabel id="fornecedor">Fornecedor:</InputLabel>
          <Select
            value={razaoSocialFornecedor}
            onChange={handleChange}
            {...register("fornecedor", {
              required:
                "Campo obrigatório, preencha-o para continuar com a operação.",
            })}
            helperText={errors?.fornecedor?.message}
          >
            {fornecedores.map((f) => (
              <MenuItem key={f.razaoSocial} value={f}>
                {f.nome}
              </MenuItem>
            ))}
          </Select>

          <InputLabel>Produto:</InputLabel>
          <TextField
            type="text"
            value={props.produto.nome}
            disabled
            variant="standard"
          />
        </div>

        <div className="form-coluna">
          <InputLabel labelId="quantidade">Quantidade:</InputLabel>
          <TextField
            id="quantidade"
            type="number"
            placeholder="Informe a quantidade..."
            {...register("quantidade", {
              required:
                "Campo obrigatório, preencha-o para continuar com a operação.",
            })}
            helperText={errors?.quantidade?.message}
            variant="standard"
          />

          <InputLabel htmlFor="preco">Preço Unitário:</InputLabel>
          <TextField
            type="text"
            placeholder="Informe o preço unitário..."
            variant="standard"
            {...register("preco", {
              required:
                "Campo obrigatório, preencha-o para continuar com a operação.",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Digite um valor numérico positivo válido (ex: 10.50)",
              },
            })}
            helperText={errors?.preco?.message}
          />
        </div>
        <Button variant="contained" type="submit">
          Cadastrar nova cotação
        </Button>
      </form>
    </div>
  );
}
