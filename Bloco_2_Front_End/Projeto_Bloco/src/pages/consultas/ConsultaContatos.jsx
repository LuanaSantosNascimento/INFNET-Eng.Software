import { useEffect, useState } from "react";
import { lerDados } from "../../servicos/firebase/lerDados";
import DataTable from "react-data-table-component";
import "../../css/Consultas.css";

export default function ConsultaContatos() {
  const [contatos, setContatos] = useState([]);
  useEffect(() => {
    const consultarContatos = async () => {
      try {
        const dados = await lerDados("contatos");
        setContatos(dados);
      } catch (e) {
        console.error(`Erro ao tentar consultar contatos ${e}`);
      }
    };
    consultarContatos();
  }, []);

  const colunas = [
    
    {
        name: <span className="negrito">Nome</span>,
        selector: (row) => row.nome,
        sortable: true,
    },
    {
        name: <span className="negrito">E-mail</span>,
        selector: (row) => row.email,
        sortable: true,
    },
    {
        name: <span className="negrito">Telefone</span>,
        selector: (row) => row.telefone,
        sortable: true,
    },
    {
        name: <span className="negrito">Fornecedor</span>,
        selector: (row) => row.razaoSocialFornecedor,
        sortable: true,
    }
];

const opcoesPaginacao = {
    rowsPerPageText: "Linhas por página:",
    rangeSeparatorText: "de",
};

  return (
    <div>
      <h2 className="titulo">Consulta de Contatos</h2>
      <DataTable
                columns={colunas}
                data={contatos}
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
