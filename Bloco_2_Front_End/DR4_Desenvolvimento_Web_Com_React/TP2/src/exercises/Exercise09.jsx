import React, { useMemo, useState } from "react";
import { faker } from "@faker-js/faker";
import "../css/Exercicio8.css";

export default function Exercise09() {
  const nomes = useMemo(
    () => Array.from({ length: 100 }, () => faker.person.fullName()),
    [],
  );

  const [iniciais, setIniciais] = useState("");

  const nomesFiltrados = useMemo(
    () =>
      nomes.filter((nome) =>
        nome.toUpperCase().includes(iniciais.toUpperCase()),
      ),
    [iniciais, nomes],
  );

  return (
    <div className="container">
      <h1>Exercício 09</h1>
      <input
        type="text"
        placeholder="Digite um ou mais caracters..."
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
