import { useState, useEffect } from "react";
import { cadastrarDados } from "../../servicos/firebase/cadastrarDados";
import { lerDados } from "../../servicos/firebase/lerDados";
import "../../css/FormCadastroProdutos.css";

export default function Contatos() {
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [razaoSocialFornecedor, setRazaoSocialFornecedor] = useState("");
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const idDocumento = await cadastrarDados(
                {
                    nome,
                    telefone,
                    email,
                    razaoSocialFornecedor,
                },
                "contatos",
            );

            alert(`Contato '${nome}' cadastrado com sucesso!`);
            console.log(`ID do registro gerado: ${idDocumento}`);
            setNome("");
            setTelefone("");
            setEmail("");
            setRazaoSocialFornecedor("");
        } catch (e) {
            console.log("Erro ao cadastrar contato", e);
        }
    };

    return (
        <div className="container-formulario">
            <h3>Contatos</h3>

            <form onSubmit={handleSubmit} className="form-linha">
                <div className="form-coluna">
                    <label htmlFor="nome"> Nome:</label>
                    <input
                        id="nome"
                        required
                        type="text"
                        value={nome}
                        placeholder="Informe o nome..."
                        onChange={(e) => setNome(e.target.value)}
                    ></input>

                    <label htmlFor="telefone">Telefone:</label>
                    <input
                        placeholder="Informe o telefone..."
                        id="telefone"
                        type="text"
                        required
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    ></input>
                </div>

                <div className="form-coluna">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        required
                        placeholder="Informe o email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>

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
                </div>
                <button type="submit">Cadastrar novo contato</button>
            </form>
        </div>
    );
}
