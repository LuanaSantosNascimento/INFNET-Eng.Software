import React, { useState } from "react";
import "../css/App.css"

export default function Exercise01() {
  const [usuario, setUsuario] = useState({
    nome: "Rodrigo",
    idade: 26,
  });

  const incrementarIdade = () => {
    setUsuario((estado) => ({
      ...estado,
      idade: estado.idade + 1,
    }));
  };

  const decrementarIdade = () => {
    setUsuario((estado) => ({
      ...estado,
      idade: estado.idade - 1,
    }));
  };

  return (
    <div className="container">
      <h1>Exercício 01</h1>
      <p>Nome: {usuario.nome}</p>
      <p>Idade: {usuario.idade}</p>

      <div>
        <button 
          onClick={incrementarIdade}
          className="botao incrementar"
          >Incrementar Idade</button>
        <button 
          className="botao decrementar"
          onClick={decrementarIdade}>Decrementar Idade</button>

      </div>
    </div>
  );
}
