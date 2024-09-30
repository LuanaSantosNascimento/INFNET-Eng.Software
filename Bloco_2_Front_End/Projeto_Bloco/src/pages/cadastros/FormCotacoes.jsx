import { useState, useEffect } from "react";
import { cadastrarDados } from "../../servicos/firebase/cadastrarDados";
import { lerDados } from "../../servicos/firebase/lerDados";
import "../../css/FormCadastrosCotacoes.css";

export default function Cotacoes() {
    const [produto, setProduto] = useState("");
    const [precoUnitario, setPrecoUnitario] = useState("");
    const [valorTotalCotacao, setValorTotalCotacao] = useState("");
    const [data, setData] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [fornecedores, setFornecedores] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [razaoSocialFornecedor, setRazaoSocialFornecedor] = useState("");

    const formatarPrecoUnitario = (valor) => {
        return valor !== "" ? parseFloat(valor).toFixed(2) : "";
    };

    const formatarData = (data) => {
        if (!data) return "";

        const dataObj = new Date(data);
        const dia = dataObj.getDate();
        const mes = dataObj.getMonth() + 1;
        const ano = dataObj.getFullYear();

        return `${dia}/${mes}/${ano}`;
    };
    
    useEffect(() => {
        const carregarDados = async () => {
            try {
                const fornecedores = await lerDados("fornecedores");
                const produtosBase = await lerDados("produtos");
                setFornecedores(fornecedores);
                setProdutos(produtosBase);
            } catch (e) {
                console.error(`Erro ao tentar consultar dados da base ${e}`);
            }
        };
        carregarDados();
    }, []);

    useEffect(() => {
        if (quantidade && precoUnitario) {
            const valorTotal = parseInt(quantidade) * parseFloat(precoUnitario);
            setValorTotalCotacao(valorTotal.toFixed(2));
        } else {
            setValorTotalCotacao("");
        }
    }, [quantidade, precoUnitario]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const idDocumento = await cadastrarDados(
                {
                    produto,
                    precoUnitario: parseFloat(precoUnitario).toFixed(2),
                    valorTotalCotacao,
                    data: formatarData(data),
                    quantidade,
                    razaoSocialFornecedor,
                },
                "cotacoes",
            );

              alert(`Cotação para o produto'${produto}' cadastrada com sucesso!`);
              console.log(`ID do registro gerado: ${idDocumento}`);
            setProduto("");
            setPrecoUnitario("");
            setValorTotalCotacao("");
            setData("");
            setQuantidade("");
            setRazaoSocialFornecedor("");
        } catch (e) {
            console.log("Erro ao cadastrar cotação", e);
        }
    };

    return (
        <div className="container-formulario">
            <h3>Cotações</h3>

            <form onSubmit={handleSubmit} className="form-linha">
                <div className="form-coluna">
                    <label htmlFor="fornecedor">Fornecedor:</label>
                    <select
                        id="fornecedor"
                        required
                        value={razaoSocialFornecedor}
                        onChange={(e) =>
                            setRazaoSocialFornecedor(e.target.value)
                        }
                    >
                        <option value="">Selecione um fornecedor</option>
                        {fornecedores.map((f) => (
                            <option key={f.razaoSocial} value={f.razaoSocial}>
                                {f.nome}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="produto">Produto:</label>
                    <select
                        id="produto"
                        required
                        value={produto}
                        onChange={(e) => setProduto(e.target.value)}
                    >
                        <option value="">Selecione um produto</option>
                        {produtos.map((p) => (
                            <option key={p.nome} value={p.nome}>
                                {p.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-coluna">
                    <label htmlFor="quantidade">Quantidade:</label>
                    <input
                        id="quantidade"
                        type="number"
                        required
                        placeholder="Informe a quantidade..."
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                    ></input>

                    <label htmlFor="preco">Preço Unitário:</label>
                    <input
                        id="preco"
                        type="number"
                        placeholder="Informe o preço unitário..."
                        required
                        value={formatarPrecoUnitario(precoUnitario)}
                        onChange={(e) => setPrecoUnitario(e.target.value)}
                    ></input>
                </div>
                <div className="form-coluna">
                    <label htmlFor="data">Data:</label>
                    <input
                        id="data"
                        type="date"
                        required
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    ></input>

                    <label htmlFor="valorTotalCotacao">Valor total:</label>
                    <input
                        id="valorTotalCotacao"
                        type="number"
                        placeholder="..."
                        step="0.01"
                        readOnly
                        value={valorTotalCotacao}
                    ></input>
                </div>

                <button type="submit">Cadastrar nova cotação</button>
            </form>
        </div>
    );
}
