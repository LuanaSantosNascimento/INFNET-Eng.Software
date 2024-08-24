import React, { useReducer, useState } from "react";
import "../css/TodoList.css";

export default function Exercise05() {
  const itensReducer = (itens, acao) => {
    switch (acao.tipo) {
      case "ADICIONAR_ITEM":
        return [...itens, acao.dados];
      case "REMOVER_ITEM":
        return itens.filter((item) => item.id !== acao.dados);
      default:
        return itens;
    }
  };

  const [inputItem, setInputItem] = useState("");
  const [itens, acao] = useReducer(itensReducer, []);

  const adicionarItem = () => {
    if (inputItem.trim() !== "") {
      const novoItem = {
        id: Date.now().toString(),
        texto: inputItem,
      };

      acao({ tipo: "ADICIONAR_ITEM", dados: novoItem });
      setInputItem("");
    }
  };

  return (
    <div className="container">
      <h1>Exercício 05</h1>

      <div className="inputContainer">
        <input
          type="text"
          placeholder="Adicione um novo item..."
          value={inputItem}
          onChange={(e) => setInputItem(e.target.value)}
          className="input"
        />

        <button onClick={adicionarItem} className="botao botaoAdicionar">
          Adicionar
        </button>
      </div>

      <ul className="lista">
        {itens.map((item) => (
          <li key={item.id} className="item">
            {item.texto}
            <button
              onClick={() => acao({ tipo: "REMOVER_ITEM", dados: item.id })}
              className="botao botaoRemover"
            >
              Remover Item
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
