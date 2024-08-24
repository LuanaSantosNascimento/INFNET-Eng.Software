import React, { useMemo, useState } from "react";
import { faker } from "@faker-js/faker";
import "../css/Exercicio8.css";

export default function Exercise08() {
  const nomesCompletos = useMemo(
    () => Array.from({ length: 100 }, () => faker.person.fullName()),
    [],
  );

  const [iniciais, setIniciais] = useState("");

  const nomesFiltrados = useMemo(
    () =>
      nomesCompletos.filter((nome) =>
        nome.toUpperCase().startsWith(iniciais.toUpperCase()),
      ),
    [iniciais, nomesCompletos],
  );

  return (
    <div className="container">
      <h1>Exercício 08</h1>
      <input
        type="text"
        placeholder="Digite um nome ou iniciais..."
        value={iniciais}
        onChange={(e) => setIniciais(e.target.value)}
        className="input"
      />
      <ul className="nomes">
        {nomesFiltrados.map((nome, indice) => (
          <li key={indice} className="item">{nome}</li>
        ))}
      </ul>
    </div>
  );
}
