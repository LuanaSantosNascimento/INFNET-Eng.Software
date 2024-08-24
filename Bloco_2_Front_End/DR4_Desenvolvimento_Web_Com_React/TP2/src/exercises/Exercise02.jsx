import React, { useReducer } from "react";
import "../css/App.css"

export default function Exercise02() {
  const usuarioReducer = (estado, acao) => {
    switch (acao.tipo) {
      case "INCREMENTAR_IDADE":
        return { ...estado, idade: estado.idade + 1 };
      case "DECREMENTAR_IDADE":
        return { ...estado, idade: estado.idade - 1 };
      default:
        return estado;
    }
  };

  const usuarioEstadoInicial = {
    nome: "Gabriela",
    idade: 25,
  };

  const [usuario, acao] = useReducer(usuarioReducer, usuarioEstadoInicial);

  return (
    <div className="container">
      <h1>Exercício 02</h1>
      <p>Nome: {usuario.nome}</p>
      <p>Idade: {usuario.idade}</p>

      <div>
        <button
          onClick={() => acao({ tipo: "INCREMENTAR_IDADE" })}
          className="botao incrementar"
        >
          Incrementar Idade
        </button>
        <button
          className="botao decrementar"
          onClick={() => acao({ tipo: "DECREMENTAR_IDADE" })}
        >
          Decrementar Idade
        </button>
      </div>
    </div>
  );
}
