import { useEffect, useState } from "react";
import { lerDados } from "../../servicos/firebase/lerDados";
import DataTable from "react-data-table-component";
import "../../css/Consultas.css";

export default function ConsultaFornecedores() {
    const [fornecedores, setFornecedores] = useState([]);

    useEffect(() => {
        const consultarFornecedores = async () => {
          try {
            const dados = await lerDados("fornecedores");
            setFornecedores(dados);
          } catch (e) {
            console.error(`Erro ao tentar consultar fornecedores ${e}`);
          }
        };
        consultarFornecedores();
      }, []);
    
      const colunas = [
        
        {
            name: <span className="negrito">CNPJ</span>,
            selector: (row) => row.cnpj,
            sortable: true,
        },
        {
            name: <span className="negrito">E-mail</span>,
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: <span className="negrito">Razão Social</span>,
            selector: (row) => row.razaoSocial,
            sortable: true,
        },
        {
            name: <span className="negrito">Cidade</span>,
            selector: (row) => row.endereco.cidade,
            sortable: true,
        },
        {
            name: <span className="negrito">Estado</span>,
            selector: (row) => row.endereco.estado,
            sortable: true,
        },
        {
            name: <span className="negrito">Rua</span>,
            selector: (row) => row.endereco.rua,
            sortable: true,
        },
        {
            name: <span className="negrito">CEP</span>,
            selector: (row) => row.endereco.cep,
            sortable: true,
        }
    ];
    
    const opcoesPaginacao = {
        rowsPerPageText: "Linhas por página:",
        rangeSeparatorText: "de",
    };

    return (
        <div>
            <h2 className="titulo">Consulta de Fornecedores</h2>
            <DataTable
                columns={colunas}
                data={fornecedores}
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