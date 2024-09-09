import React, { useState } from "react";

const Exercise02 = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [texto, setTexto] = useState("");
  const [validacaoNome, setValidacaoNome] = useState("");
  const [validacaoTelefone, setValidacaoTelefone] = useState("");

  const validarTelefone = (telefone) => {
    if (telefone.trim() === "") {
      return "O campo 'telefone' é obrigatório, preencha-o para continuar com a operação.";
    }
    return "";
  };
  const validarNome = (nome) => {
    if (nome.trim() === "") {
      return "O campo 'nome' é obrigatório, preencha-o para continuar com a operação.";
    }
    return "";
  };

  const handleEnviar = (e) => {
    setTexto("");
    e.preventDefault();
    validarCampos(nome, telefone);

    if (nome.trim() !== "" && telefone.trim() !== "") {
      console.log("Nome: " + nome);
      console.log("Telefone: " + telefone);
      setNome("");
      setTelefone("");
      setTexto("Dados enviados!");
    }
  };

  function validarCampos(nome, telefone) {
    setValidacaoNome(validarNome(nome));
    setValidacaoTelefone(validarTelefone(telefone));
  }

  return (
    <div className="container">
      <h1>Exercício 02</h1>
      <form onSubmit={handleEnviar}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Insira seu nome..."
          className="input"
        />
        <p>{validacaoNome}</p>
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="Insira seu telefone..."
          className="input"
        />
        <p>{validacaoTelefone}</p>

        <button type="submit" className="botao submit-azul">
          Enviar
        </button>
      </form>
      <p>{texto}</p>
    </div>
  );
};

export default Exercise02;
