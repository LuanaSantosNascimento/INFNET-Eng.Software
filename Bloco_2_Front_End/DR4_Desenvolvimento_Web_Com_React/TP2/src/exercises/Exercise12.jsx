import React, { useState, useEffect } from "react";
import { listarUFs, obterMunicipios } from "../servicos/Localidades";
import "../css/DropDownList.css";

export default function Exercise12() {
  const [UFs, setUFs] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [UFSelecionado, setUFSelecionado] = useState("");
  const [municipioSelecionado, setMunicipioSelecionado] = useState(null);
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

  const handleMunicipioChange = (e) => {
    console.log(e.target.value);
    const municipio = municipios.find((m) => m.id === parseInt(e.target.value));
    setMunicipioSelecionado(municipio);
    console.log(municipio);
  };

  return (
    <div className="container">
      <h1>Exercício 12</h1>
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
            <select
              value={municipioSelecionado?.id}
              onChange={handleMunicipioChange}
              className="dropdown"
            >
              <option value="">Selecione um Município</option>
              {municipios.map((municipio) => (
                <option key={municipio.id} value={municipio.id}>
                  {municipio.nome}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
      {municipioSelecionado && (
        <div className="dados-texto">
          <h3>{`Informações do Município ${municipioSelecionado.nome}`}</h3>
          <p><strong>Nome:</strong> {municipioSelecionado.nome}</p>
          <p><strong>Mesorregião:</strong> {municipioSelecionado.microrregiao.mesorregiao.nome}</p>
          <p><strong>UF:</strong> {municipioSelecionado.microrregiao.mesorregiao.UF.nome}</p>
          <p><strong>Região:</strong> {municipioSelecionado.microrregiao.mesorregiao.UF.regiao.nome}</p>
        </div>
      )}
    </div>
  );
}
