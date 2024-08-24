import React, { useReducer, useState } from "react";
import "../css/App.css"

export default function Exercise04() {
  const usuariosReducer = (estado, acao) => {
    switch (acao.tipo) {
      case "INCREMENTAR_IDADE":
        return estado.map(usuario =>
          usuario.id === acao.dados ? {...usuario, idade: usuario.idade + 1} : usuario);
      case "DECREMENTAR_IDADE":
        return estado.map(usuario =>
          usuario.id === acao.dados ? {...usuario, idade: usuario.idade - 1} : usuario);
      case "ADICIONAR_USUARIO":
        return [...estado, acao.dados];
      case "REMOVER_USUARIO":
        return estado.filter(usuario => usuario.id !== acao.dados);
      default:
        return estado;
    }
  };

  const [usuarios, acao] = useReducer(usuariosReducer, []);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");

  const adicionarUsuario = () => {
    if (nome && idade) {
      const novoUsuario = {
        id: Date.now().toString(),
        nome: nome,
        idade: parseInt(idade),
      };

      acao({tipo: "ADICIONAR_USUARIO", dados: novoUsuario})
      setNome("");
      setIdade("")
    }
  };

  return (
    <div className="container">
      <h1>Exercício 04</h1>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Nome..."
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
          className="input"
        />

        <input
          type="number"
          placeholder="Idade..."
          value={idade}
          onChange={(evento) => setIdade(evento.target.value)}
          className="input"
        />

        <button onClick={adicionarUsuario} className="botao adicionarUsuario">
          Adicionar
        </button>

        {usuarios.map((usuario) => (
          <div key={usuario.id} className="containerUsuario">
            <p>Nome: {usuario.nome}</p>
            <p>Idade: {usuario.idade}</p>
            <div>
              <button
                onClick={() =>
                  acao({ tipo: "INCREMENTAR_IDADE", dados: usuario.id })
                }
                className="botao incrementar"
              >
                Incrementar Idade
              </button>
              <button
                className="botao decrementar"
                onClick={() =>
                  acao({ tipo: "DECREMENTAR_IDADE", dados: usuario.id })
                }
              >
                Decrementar Idade
              </button>
              <button
                className="botao excluirUsuario"
                onClick={() => acao({ tipo: "REMOVER_USUARIO", dados: usuario.id })}
              >
                Excluir Usuário
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
