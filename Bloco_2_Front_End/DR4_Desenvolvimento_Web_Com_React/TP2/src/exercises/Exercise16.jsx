import React, { useState, useEffect } from "react";
import { consultarRakingNomes } from "../servicos/ConsultarRankingNomes";
import "../css/RankingList.css";

export default function Exercise16() {
  const [nomes, setNomes] = useState([]);
  const [decada, setDecada] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarRankingNomes() {
      if (decada && decada.endsWith("0") && decada.length === 4) {
        setCarregando(true);
        try {
          let listaNomes = await consultarRakingNomes(decada);
          setErro("");
          setNomes(listaNomes);
        } catch (erro) {
          setErro("Não foi possível obter o ranking. Tente novamente.");
          setNomes([]);
        }
        setCarregando(false);
      } else {
        setNomes([]);
      }
    }
    carregarRankingNomes();
  }, [decada]);

  return (
    <div className="container">
      <h1>Exercício 16</h1>
      <input
        type="number"
        placeholder="Digite um ano terminado em 0 (ex: 1990)"
        value={decada}
        onChange={(e) => setDecada(e.target.value)}
        className="input"
      />

      {erro && <p className="erro">{erro}</p>}
      {decada === "" &&!erro && nomes.length === 0 ? (
        <p>Aguarde...</p>
      ) : nomes.length === 0 && decada !== "" ? (
        <p>Nenhum nome encontrado para a decada informada.</p>
      ) : (
        !carregando &&
        nomes.length > 0 && (
          <ul className="dados-lista">
            {nomes.map((nome) => (
              <li key={nome.id} className="item">
                <p>
                  <strong>Ranking:</strong> {nome.ranking}
                </p>
                <p>
                  <strong>Nome:</strong> {nome.nome}
                </p>
                <p>
                  <strong>Frequência</strong> {nome.frequencia}
                </p>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
