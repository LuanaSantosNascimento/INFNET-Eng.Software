import { useEffect, useState } from "react";
import { lerDados } from "../../servicos/firebase/lerDados";
import DataTable from "react-data-table-component";
import "../../css/Consultas.css";

export default function ConsultaProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const consultarProdutos = async () => {
      try {
        const dados = await lerDados("produtos");
        setProdutos(dados);
      } catch (e) {
        console.error(`Erro ao tentar consultar produtos ${e}`);
      }
    };
    consultarProdutos();
  }, []);

  const colunas = [
    {
      name: <span className="negrito">Nome</span>,
      selector: (row) => row.nome,
      sortable: true,
    },
    {
      name: <span className="negrito">Descricao</span>,
      selector: (row) => row.descricao,
      sortable: true,
    },
    {
      name: <span className="negrito">Preço Unitário</span>,
      selector: (row) => `R$ ${row.preco}`,
      sortable: true,
    },
  ];

  const opcoesPaginacao = {
    rowsPerPageText: "Linhas por página:",
    rangeSeparatorText: "de",
  };

  return (
    <div>
      <h2 className="titulo">Consulta de Produtos</h2>
      <DataTable
        columns={colunas}
        data={produtos}
        pagination
        paginationPerPage={5}
        dense
        responsive
        striped
        paginationComponentOptions={opcoesPaginacao}
        defaultSortField="produto"
        selectableRowsHighlight
        selectableRowsSingle
      />
    </div>
  );
}
