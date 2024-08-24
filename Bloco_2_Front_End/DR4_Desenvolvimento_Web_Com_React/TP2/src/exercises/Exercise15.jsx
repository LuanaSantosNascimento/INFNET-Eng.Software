import React, { useState, useEffect } from "react";
import { listarUFs, obterMunicipios } from "../servicos/Localidades";
import "../css/DropDownList.css";

export default function Exercise15() {
  const [UFs, setUFs] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [UFSelecionado, setUFSelecionado] = useState("");
  const [carregandoUFs, setCarregandoUFs] = useState(true);
  const [carregandoMunicipios, setCarregandoMunicipios] = useState(false);
  const [filtro, setFiltro] = useState("");

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

  const municipiosFiltrados = municipios.filter((m) =>
    m.nome.toUpperCase().includes(filtro.toUpperCase()),
  );

  return (
    <div className="container">
      <h1>Exercício 15</h1>
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
            <>
              <input
                type="text"
                placeholder="Pesquise por iniciais..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="input"
              />

              {municipiosFiltrados.length === 0 ? (
                <p>Nenhum município encontrado de acordo com o filtro.</p>
              ) : (
                <ul className="dados-lista">
                  {municipiosFiltrados.map((municipio) => (
                    <li key={municipio.id} className="item">
                      {municipio.nome}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
