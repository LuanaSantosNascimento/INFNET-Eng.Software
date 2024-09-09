import React, { useState } from "react";

const Exercise01 = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [texto, setTexto] = useState("");

  const handleEnviar = (e) => {
    e.preventDefault();
    setTexto("Dados enviados!");
    console.log("Nome: " + nome);
    console.log("Telefone: " + telefone);
    setNome("");
    setTelefone("");
  };

  return (
    <div className="container">
      <h1>Exercício 01</h1>
      <form onSubmit={handleEnviar}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Insira seu nome..."
          required
          className="input"
        />
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="Insira seu telefone..."
          required
          className="input"
        />
        <button type="submit" className="botao submit-azul">
          Enviar
        </button>
      </form>
      <p>{texto}</p>
    </div>
  );
};

export default Exercise01;
