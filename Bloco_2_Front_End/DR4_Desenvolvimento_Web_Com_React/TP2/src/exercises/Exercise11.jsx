import React, { useMemo, useState } from "react";
import { faker } from "@faker-js/faker";
import "../css/Exercicio8.css";

export default function Exercise11() {
  const pessoas = useMemo(
    () =>
      new Array(100).fill().map(() => {
        let pessoa = new Object();
        pessoa.nome = faker.person.fullName(),
        pessoa.cargo = faker.person.jobTitle();

        return pessoa;
      }),
    [],
  );

  const [iniciais, setIniciais] = useState("");

  const pessoasFiltradas = useMemo(
    () =>
      pessoas.filter(
        ({ nome, cargo }) =>
          nome.toUpperCase().includes(iniciais.toUpperCase()) ||
          cargo.toUpperCase().includes(iniciais.toUpperCase()),
      ),
    [iniciais, pessoas],
  );

  return (
    <div className="container">
      <h1>Exercício 11</h1>
      <input
        type="text"
        placeholder="Digite um nome, cargo ou iniciais..."
        value={iniciais}
        onChange={(e) => setIniciais(e.target.value)}
        className="input"
      />
      <ul className="nomes">
        {pessoasFiltradas.map((pessoa, indice) => (
          <li key={indice} className="item">
            <p>{pessoa.nome}</p>
            <p>{pessoa.cargo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
