import { useState } from "react";
import { cadastrarDados } from "../../servicos/firebase/cadastrarDados";
import "../../css/FormCadastroProdutos.css";

export default function Produtos() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const idDocumento = await cadastrarDados(
        {
          nome,
          preco,
          descricao,
        },
        "produtos",
      );
      alert(`Produto '${nome}' cadastrado com sucesso!`);
      console.log(`ID do registro gerado: ${idDocumento}`);
      setNome("");
      setDescricao("");
      setPreco("");
    } catch (e) {
      console.log("Erro ao cadastrar produto", e);
    }
  };

  return (
    <div className="container-formulario">
      <h3>Produtos</h3>
      <form onSubmit={handleSubmit} className="form-linha">
        <div className="form-coluna">
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            required
            placeholder="Informe o nome..."
            value={nome}
            type="text"
            onChange={(e) => setNome(e.target.value)}
          ></input>
        </div>

        <div className="form-coluna">
          <label htmlFor="descricao">Descrição:</label>
          <input
            id="descricao"
            type="text"
            placeholder="Informe a descrição..."
            required
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          ></input>
        </div>

        <div className="form-coluna">
          <label htmlFor="preco">Preço:</label>
          <input
            id="preco"
            type="number"
            required
            placeholder="Informe o preço..."
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          ></input>
        </div>

        <button type="submit">Cadastrar novo produto</button>
      </form>
    </div>
  );
}
