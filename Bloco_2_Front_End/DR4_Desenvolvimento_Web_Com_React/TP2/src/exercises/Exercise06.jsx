import React, { useReducer, useState } from "react";
import "../css/TodoList.css";

export default function Exercise05() {
  const itensReducer = (itens, acao) => {
    switch (acao.tipo) {
      case "ADICIONAR_ITEM":
        return [...itens, acao.dados];
      case "REMOVER_ITEM":
        return itens.filter((item) => item.id !== acao.dados);
      case "TOGGLE_COMPLETAR_TAREFA":
        return itens.map((item) => item.id === acao.dados
            ? { ...item, completado: !item.completado } : item);
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
        completado: false,
      };

      acao({ tipo: "ADICIONAR_ITEM", dados: novoItem });
      setInputItem("");
    }
  };

  return (
    <div className="container">
      <h1>Exercício 06</h1>

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
          <li
            key={item.id}
            className={`item ${item.completado ? "itemCompletado" : ""}`}
          >
            <p>{item.texto}</p>
            <button
              onClick={() => acao({ tipo: "REMOVER_ITEM", dados: item.id })}
              className="botao botaoRemover"
            >
              Remover Item
            </button>

            <button
              onClick={() =>
                acao({ tipo: "TOGGLE_COMPLETAR_TAREFA", dados: item.id })
              }
              className="botao botaoToggleCompletar"
            >
              {`${item.completado ? "Descompletar" : "Completar"} Item`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
