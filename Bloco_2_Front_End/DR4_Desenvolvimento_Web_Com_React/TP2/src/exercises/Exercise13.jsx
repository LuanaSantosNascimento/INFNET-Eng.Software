import React, { useState, useEffect } from "react";
import { listarUFs, obterMunicipios } from "../servicos/Localidades";
import "../css/DropDownList.css";

export default function Exercise13() {
  const [UFs, setUFs] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [UFSelecionado, setUFSelecionado] = useState("");
  const [carregandoUFs, setCarregandoUFs] = useState(true);
  const [carregandoMunicipios, setCarregandoMunicipios] = useState(false);

  useEffect(() => {
    async function carregarUFs() {
      let listaUF = await listarUFs();
      setCarregandoUFs(false);
      setUFs(listaUF);
    }
    carregarUFs();
  }, []);

  useEffect(() => {
    if (UFSelecionado) {
      setCarregandoMunicipios(true);
      async function carregarMunicipios() {
        let listaMunicipios = await obterMunicipios(UFSelecionado);
        setCarregandoMunicipios(false);
        setMunicipios(listaMunicipios);
      }
      carregarMunicipios();
    }
  }, [UFSelecionado]);

  return (
    <div className="container">
      <h1>Exercício 13</h1>
      {carregandoUFs ? (
        <p>Aguarde, a consulta de UFs está em andamento...</p>
      ) : (
        <select
          value={UFSelecionado}
          onChange={(e) => setUFSelecionado(e.target.value)}
          className="dropdown"
        >
          <option value="">Selecione uma UF</option>
          {UFs.map((uf) => (
            <option
              key={uf.id}
              value={uf.id}
            >{`${uf.sigla} - ${uf.nome}`}</option>
          ))}
        </select>
      )}
      {UFSelecionado && (
        <div>
          {carregandoMunicipios ? (
            <p>Aguarde, a consulta de municípios está em andamento...</p>
          ) : (
            <ul className="dados-lista">
              {municipios.map((municipio) => (
                <li key={municipio.id} className="item">{municipio.nome}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
