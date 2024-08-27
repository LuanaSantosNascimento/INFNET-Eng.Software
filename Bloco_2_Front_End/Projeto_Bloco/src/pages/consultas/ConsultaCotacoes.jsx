import { useEffect, useState } from "react";
import { lerDados } from "../../servicos/firebase/lerDados";
import DataTable from "react-data-table-component";
import "../../css/Consultas.css";

export default function ConsultaCotacoes() {
    const [cotacoes, setCotacoes] = useState([]);

    useEffect(() => {
        const consultarCotacoes = async () => {
            try {
                const dados = await lerDados("cotacoes");
                setCotacoes(dados);
            } catch (e) {
                console.error(`Erro ao tentar consultar cotações ${e}`);
            }
        };
        consultarCotacoes();
    }, []);

    const colunas = [
        {
            name: <span className="negrito">Data de Cotação</span>,
            selector: (row) => row.data,
            sortable: true,
        },
        {
            name: <span className="negrito">Produto</span>,
            selector: (row) => row.produto,
            sortable: true,
        },
        {
            name: <span className="negrito">Preço Unitário</span>,
            selector: (row) => `R$ ${row.precoUnitario}`,
            sortable: true,
        },
        {
            name: <span className="negrito">Quantidade</span>,
            selector: (row) => row.quantidade,
            sortable: true,
        },
        {
            name: <span className="negrito">Fornecedor</span>,
            selector: (row) => row.razaoSocialFornecedor,
            sortable: true,
        },
        {
            name: <span className="negrito">Valor Total</span>,
            selector: (row) => `R$ ${row.valorTotalCotacao}`,
            sortable: true,
        },
    ];

    const opcoesPaginacao = {
        rowsPerPageText: "Linhas por página:",
        rangeSeparatorText: "de",
    };

    return (
        <div>
            <h2 className="titulo">Consulta de Cotações</h2>
            <DataTable
                columns={colunas}
                data={cotacoes}
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
